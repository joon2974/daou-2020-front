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

const resourceHost = "http://localhost:3000/api";
const headers = {
  "Content-type": "application/json; charset=UTF-8",
  Accept: "*/*",
  "Access-Control-Allow-Origin": "*",
};

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
      const password = crypto
        .createHash("sha256")
        .update(this.password)
        .digest("base64");

      axios
        .post(`${resourceHost}/users`, { nickname, password }, headers)
        .then(() => {
          (this.id = ""), (this.password = "");
          this.vrfPassword = "";
          this.changeTab();
          alert("가입 완료되었습니다!");
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