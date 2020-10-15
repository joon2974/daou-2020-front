<template>
  <v-card class="px-4">
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="logIn"
      >
        <v-text-field
          autofocus
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
        <v-btn :disabled="!valid" class="mr-4" type="submit">Sign in</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import crypto from "crypto";
import axios from "axios";
import { generateCsrfToken } from "../../../secretStrings";
import { httpInfos } from "../../../secretStrings";

export default {
  data() {
    return {
      id: "",
      password: "",
      userSalt: "",
      idRules: [
        (v) => !!v || "ID is required",
        (v) =>
          (v && v.length <= 20) || "Your ID must be less than 20 characters",
      ],
      pwdRules: [
        (v) => !!v || "Enter the password",
        (v) =>
          (v && v.length <= 20) ||
          "Your password must be less than 20 characters",
      ],
      valid: false,
      disabled: false,
    };
  },
  methods: {
    logIn() {
      const nickname = this.id;

      axios.get(`${httpInfos.resourceHost}/users/salt/${nickname}`, httpInfos.headers)
        .then((res) => {
          this.userSalt = res.data.userSalt;
          this.requestLogin();
        })
        .catch((e) => console.log(`Salt get Error: ${e}`));
    },
    requestLogin() {
      const nickname = this.id;
      const salt = String(this.userSalt);
      const password = crypto
        .pbkdf2Sync(this.password, salt, 1038, 64, "sha512")
        .toString("base64")
        .replace(/=/gi, "");

      this.setCsrfToken();
      this.$store
        .dispatch("LOGIN", { nickname, password })
        .then(() => this.redirect())
        .catch(() => {
          alert("아이디 혹은 비밀번호가 일치하지 않습니다!");
        });
      this.removeCsrfToken();
    },
    redirect() {
      const { search } = window.location;
      // console.log(`serch: ${search}`);
      const tokens = search.replace(/^\?/, "").split("&");
      // console.log(`tokens: ${tokens}`);
      const { returnPath } = tokens.reduce((qs, tkn) => {
        // console.log(`qs: ${qs}, tkn: ${tkn}`);
        const pair = tkn.split("=");
        // console.log(`pair: ${pair}`);
        qs[pair[0]] = decodeURIComponent(pair[1]);
        // console.log(`qs pair: ${qs[pair[0]]}`);
        return qs;
      }, {});
      // console.log(`returPath: ${returnPath}`);

      if (returnPath === undefined) this.$router.push("/");
      else this.$router.push(returnPath);
    },
    setCsrfToken() {
      const csrfToken = generateCsrfToken().replace(/=/gi, "");
      this.$cookies.set("CSRF_TOKEN", csrfToken);

      axios.defaults.headers.common["CSRF_TOKEN"] = csrfToken;
      axios.defaults.headers.common["CSRF_TOKEN_IN_COOKIE"] = this.$cookies.get("CSRF_TOKEN");
    },
    removeCsrfToken() {
      delete axios.defaults.headers.common["CSRF_TOKEN"];
      delete axios.defaults.headers.common["CSRF_TOKEN_IN_COOKIE"];
      this.$cookies.remove("CSRF_TOKEN");
    }
  },
};
</script>