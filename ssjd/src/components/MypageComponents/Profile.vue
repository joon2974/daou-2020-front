<template>
  <v-card color="#2484c6" dark elevation="12">
    <div class="d-flex justify-space-between">
      <div class="d-flex flex-row">
        <div class="d-flex flex-column">
          <v-avatar class="ma-3" size="150" tile>
            <v-img src="../../assets/profile.png"></v-img>
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
          <v-card-subtitle class="mt-2" v-text="subtitle"></v-card-subtitle>
        </div>
      </div>

      <div class="d-flex justify-space-between mr-5">
        <div class="d-flex flex-column">
          <v-dialog v-model="nicknameDialog" persistent max-width="290">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mt-5"
                outlined
                rounded
                v-bind="attrs"
                v-on="on"
                @click="changeNickname"
              >
                CHANGE NICKNAME
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline"> Change Nickname </v-card-title>
              <v-card-text>닉네임 변경</v-card-text>
              <v-card-actions>
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
                  <v-btn :disabled="!valid" class="mr-4" type="submit"
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

export default {
  data() {
    return {
      title: this.$store.state.nickName,
      subtitle: "내가 푼 문제 갯수",
      dialog: false,
      nicknameDialog: false,
      passwordDialog: false,
      file: null,
      password: "",
      vrfPassword: "",
      valid: false,
      disabled: false,
      albumBucketName: "profile-storage-alyeodaou",
      bucketRegion: "ap-northeast-2",
      IdentityPoolId: "ap-northeast-2:6a91df99-a971-436f-8e9c-d8f9d608c92c",
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
  methods: {
    changeProfile() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
      alert("프로필 사진 변경!");
    },
    changeNickname() {
      alert("닉네임 변경!");
    },
    changePassword() {
      alert("비밀번호 변경!");
    },
    upload() {
      this.dialog = false;
      AWS.config.update({
        region: this.bucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: this.IdentityPoolId,
        }),
      });

      let s3 = new AWS.S3({
        apiVersion: "2006-03-01",
        params: {
          Bucket: this.albumBucketName,
        },
      });

      let photoKey = this.file.name;

      s3.upload(
        {
          Key: photoKey,
          body: this.file,
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
        }
      );
    },
  },
};
</script>
