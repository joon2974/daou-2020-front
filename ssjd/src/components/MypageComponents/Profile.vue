<template>
  <v-card color="#2484c6" dark elevation="12" class="mx-16">
    <div class="d-flex justify-space-between">
      <div class="d-flex flex-row">
        <div class="d-flex flex-column">
          <v-avatar class="ma-3" size="150" tile>
            <v-img :src="profileImgSrc" @error="replaceSrc" v-if="!imageLoadFail"></v-img>
            <v-img src="../../assets/profile.png" v-else></v-img>
          </v-avatar>
          <v-card-actions>
            <v-dialog v-model="dialog" persistent max-width="290">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="ml-4 mt-1 mb-2"
                  outlined
                  rounded
                  small
                  v-bind="attrs"
                  v-on="on"
                >
                  CHANGE PHOTO
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="headline"> 프로필 사진 변경 </v-card-title>
                <v-card-text>변경할 사진을 선택해 주세요</v-card-text>
                <v-card-actions>
                  <v-file-input
                    label="File input"
                    filled
                    show-size
                    prepend-icon="mdi-camera"
                    @change="changeProfile"
                    ref="file"
                    type="file"
                  ></v-file-input>
                </v-card-actions>
                <v-card-actions>
                  <v-btn color="green darken-1" text @click="dialog = false">
                    닫기
                  </v-btn>
                  <v-btn color="green darken-1" text @click="upload">
                    확인
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </div>
        <div class="d-flex flex-column">
          <v-card-title class="text-h3 mt-5" v-text="title"></v-card-title>
          <v-card-subtitle class="mt-2" v-text="subtitle"> </v-card-subtitle>
        </div>
      </div>

      <div class="d-flex justify-space-between mr-5">
        <div class="d-flex flex-column">
          <v-dialog v-model="nicknameDialog" persistent max-width="290">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="mt-5" outlined rounded v-bind="attrs" v-on="on">
                CHANGE NICKNAME
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline"> Change Nickname </v-card-title>
              <v-card-actions>
                <v-text-field
                  autofocus
                  v-model="newNickname"
                  :counter="20"
                  label="새 닉네임"
                  required
                  ref="newNickname"
                ></v-text-field>
              </v-card-actions>
              <v-card-actions>
                <v-btn
                  color="green darken-1"
                  text
                  @click="changeNickname"
                  class="d-flex flex-row"
                >
                  닉네임 변경
                </v-btn>
                <v-btn
                  color="green darken-1"
                  text
                  @click="nicknameDialog = false"
                  class="d-flex flex-row"
                >
                  닫기
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="passwordDialog" persistent max-width="350">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="mt-5" outlined rounded v-bind="attrs" v-on="on">
                CHANGE PASSWORD
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline"> Change Password </v-card-title>
              <v-card-actions>
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                  @submit.prevent="changePassword"
                >
                  <v-text-field
                    autofocus
                    type="password"
                    v-model="password"
                    :counter="20"
                    :rules="pwdRules"
                    label="새 비밀번호"
                    required
                  ></v-text-field>
                  <v-text-field
                    type="password"
                    v-model="vrfPassword"
                    :rules="pwdVrfRules"
                    label="비밀번호 확인"
                    required
                  ></v-text-field>
                  <v-btn
                    :disabled="!valid"
                    class="mr-4"
                    type="submit"
                    color="green darken-1"
                    text
                    >비밀번호 변경</v-btn
                  >
                </v-form>
              </v-card-actions>
              <v-card-actions>
                <v-btn
                  color="green darken-1"
                  text
                  @click="passwordDialog = false"
                  class="d-flex flex-row"
                >
                  닫기
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
import AWS from "aws-sdk";
import axios from "axios";
import crypto from "crypto";
import { mapState } from "vuex";
import { s3Config } from "../../../secretStrings";
import { httpInfos } from "../../../secretStrings";
import { generateCsrfToken } from "../../../secretStrings";

export default {
  created() {
    this.setS3Varialbes();
    this.getUserPostsCount();
    this.getImage();
  },
  data() {
    return {
      title: this.$store.state.nickName,
      subtitle: "내가 푼 문제 갯수",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
      },
      dialog: false,
      profileImgSrc: "",
      newNickname: "",
      nicknameDialog: false,
      passwordDialog: false,
      file: null,
      password: "",
      vrfPassword: "",
      valid: false,
      disabled: false,
      albumBucketName: "",
      bucketRegion: "",
      IdentityPoolId: "",
      imageLoadFail: false,
      s3: null,
      pwdVrfRules: [
        () =>
          this.vrfPassword == this.password ||
          "Passwords should be same. check again password please.",
      ],
      pwdRules: [
        (v) => !!v || "Enter the password",
        (v) =>
          (v && v.length <= 20 && v.length >= 8) ||
          "Your password must be less than 20 characters and more than 8 characters",
      ],
    };
  },
  computed: {
    ...mapState(["userId", "accessToken"]),
  },
  methods: {
    getUserPostsCount() {
      const csrfToken = generateCsrfToken().replace(/=/gi, "");
      this.$cookies.set("CSRF_TOKEN", csrfToken);

      axios.defaults.headers.common["CSRF_TOKEN"] = csrfToken;
      axios.defaults.headers.common["CSRF_TOKEN_IN_COOKIE"] = this.$cookies.get("CSRF_TOKEN");

      axios
        .get(
          `${httpInfos.resourceHost}/posts/number/${this.userId}`,
          httpInfos.headers
        )
        .then((data) => {
          this.subtitle = `내가 푼 문제 갯수: ${data.data}문제`;
        })
        .catch((e) => {
          console.log(`api 에러 profile: ${e}`);
        });

      delete axios.defaults.headers.common["CSRF_TOKEN"];
      delete axios.defaults.headers.common["CSRF_TOKEN_IN_COOKIE"];
      this.$cookies.remove("CSRF_TOKEN");
    },
    setS3Varialbes() {
      this.albumBucketName = s3Config.albumBucketName;
      this.bucketRegion = s3Config.bucketRegion;
      this.IdentityPoolId = s3Config.IdentityPoolId;

      AWS.config.update({
        region: this.bucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: this.IdentityPoolId,
        }),
      });

      this.s3 = new AWS.S3({
        apiVersion: "2006-03-01",
        params: {
          Bucket: this.albumBucketName,
        },
      });
    },
    changeProfile(file) {
      this.file = file;
      const parsedName = file.name.split(".");
      if (parsedName[parsedName.length - 1] !== "jpg") {
        alert("jpg 파일만 업로드 해주세요!");
        this.file = null;
        this.dialog = false;
        window.location.reload();
      }
    },
    changeNickname() {
      const nickname = this.$store.state.nickName;
      const newNickname = this.newNickname;
      axios.defaults.headers.common[
        "Authorization"
      ] = `${this.$store.state.accessToken}`;
      console.log(`닉네임: ${nickname}, 새로운 닉네임: ${newNickname}`);
      this.$store
        .dispatch("UPDATEUSER", { nickname, newNickname })
        .then(() => {
          this.newNickname = "";
          this.nicknameDialog = false;
          window.location.reload();
          alert("닉네임 변경이 완료되었습니다!");
        })
        .catch((e) => {
          if (e.response.request.status === 500) {
            alert("중복된 아이디 입니다!");
            this.newNickname = "";
            this.$refs.newNickname.focus();
          }
        });
    },
    changePassword() {
      const nickname = this.title;
      const salt = nickname.concat(
        nickname.slice(2, nickname.length - 2),
        nickname
          .split("")
          .reverse()
          .join("")
          .slice(0, nickname.length - 1),
        nickname.slice(3, nickname.length - 3)
      );
      const password = crypto
        .pbkdf2Sync(this.password, salt, 1038, 64, "sha512")
        .toString("base64")
        .replace(/=/gi, "");
      const csrfToken = generateCsrfToken().replace(/=/gi, "");
      this.$cookies.set("CSRF_TOKEN", csrfToken);

      axios.defaults.headers.common["CSRF_TOKEN"] = csrfToken;
      axios.defaults.headers.common["CSRF_TOKEN_IN_COOKIE"] = this.$cookies.get("CSRF_TOKEN");

      axios
        .put(
          `${httpInfos.resourceHost}/users/password`,
          { nickname, password },
          httpInfos.headers
        )
        .then(() => {
          this.password = "";
          this.vrfPassword = "";
          this.passwordDialog = false;
          alert("비밀번호 변경을 완료하였습니다!");
        })
        .catch((e) => {
          alert("비밀번호 변경을 실패했습니다.");
          console.log(e);
        });

      delete axios.defaults.headers.common["CSRF_TOKEN"];
      delete axios.defaults.headers.common["CSRF_TOKEN_IN_COOKIE"];
      this.$cookies.remove("CSRF_TOKEN");
    },
    upload() {
      let photoKey = this.userId;

      this.s3.upload(
        {
          Key: photoKey,
          Body: this.file,
          Bucket: this.albumBucketName,
          ACL: "public-read",
        },
        (err, data) => {
          if (err) {
            console.log(err);
            return alert(
              "There was an error uploading your photo: ",
              err.message
            );
          }
          alert("Successfully uploaded photo");
          console.log(data);
          console.log("파일 업로드 완료");
        }
      );
      this.dialog = false;
    },
    getImage() {
      this.s3.getSignedUrl(
        "getObject",
        {
          Bucket: this.albumBucketName,
          Key: this.userId + ".jpg"
        },
        (err, url) => {
          if (err) {
            console.log(`에러: ${err}`);
          }
          this.profileImgSrc = url;
        }
      )
    },
    deleteImage() {
      this.s3.deleteObject({
        Bucket: this.albumBucketName,
        Key: this.userId + ".jpg"
      },
      (err, data) => {
        if (err) {
          alert(`Error: ${err}`);
        }
        console.log(data);
      })
    },
    replaceSrc() {
      this.imageLoadFail = true;
    }
  },
};
</script>
