<template>
  <v-card class="px-4">
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="signUp"
      >
        <v-text-field
          autofocus
          ref="idInput"
          v-model="id"
          :counter="20"
          :rules="idRules"
          label="ID"
          required
        ></v-text-field>
        <v-text-field
          type="password"
          v-model="password"
          :rules="pwdRules"
          label="Password"
          required
        ></v-text-field>
        <v-text-field
          type="password"
          v-model="vrfPassword"
          :rules="pwdVrfRules"
          label="Verify Password"
          required
        ></v-text-field>
        <v-btn :disabled="!valid" class="mr-4" type="submit">Sign up</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import crypto from "crypto";
import axios from "axios";
import { httpInfos } from "../../../secretStrings";
import { generateCsrfToken } from "../../../secretStrings";

// 한글 입력 검사를 위함
const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
const space = /\s/g;
const special = /[~!@#$%^&*()_+|<>?:{}]/gi;


export default {
  data() {
    return {
      id: "",
      password: "",
      vrfPassword: "",
      pwdVrfRules: [
        () =>
          this.vrfPassword == this.password ||
          "Passwords should be same. check again password please.",
      ],
      idRules: [
        (v) => !!v || "ID is required",
        (v) =>
          (v && v.length <= 16) || "Your ID must be less than 16 characters",
      ],
      pwdRules: [
        (v) => !!v || "Enter the password",
        (v) =>
          (v && v.length <= 20 && v.length >= 8) ||
          "Your password must be less than 20 characters and more than 8 characters",
      ],
      valid: false,
      disabled: false,
    };
  },
  methods: {
    signUp() {
      const nickname = this.id;
      const salt = generateCsrfToken().replace(/=/gi, "");
      const password = crypto
        .pbkdf2Sync(this.password, salt, 1038, 64, "sha512")
        .toString("base64")
        .replace(/=/gi, "");

      if (korean.test(nickname)) {
        alert("아이디는 영문, 숫자만 가능합니다!");
        this.id = "";
        this.$refs.idInput.focus();
        return;
      }

      if (space.test(nickname)) {
        alert("아이디는 공백을 포함할 수 없습니다!");
        this.id = "";
        this.$refs.idInput.focus();
        return;
      }

      if (special.test(nickname)) {
        alert("아이디는 특수문자를 포함할 수 없습니다!");
        this.id = "";
        this.$refs.idInput.focus();
        return;
      }

      console.log("회원가입 솔트: " + salt);

      axios
        .post(
          `${httpInfos.resourceHost}/users`,
          { nickname, password, salt },
          httpInfos.headers
        )
        .then(() => {
          (this.id = ""), (this.password = "");
          this.vrfPassword = "";
          this.changeTab();
        })
        .catch((e) => {
          if (e.response.request.status === 500) {
            alert("중복된 아이디 입니다!");
            (this.id = ""), (this.password = "");
            this.vrfPassword = "";
            this.$refs.idInput.focus();
          }
        });
    },
    changeTab() {
      this.$emit("changeTab", 0);
    },
  },
};
</script>
