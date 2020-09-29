<template>
  <v-form @submit.prevent="sendMsg">
    <v-label>~메시지를 입력하시오~</v-label>
    <v-row>
      <v-col cols="9">
        <v-text-field v-model="message" required></v-text-field>
      </v-col>

      <v-col cols="3">
        <v-btn :disabled="disabled" type="submit">send</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import axios from "axios";
const path = "http://localhost:3000/api";

export default {
  props: ["message", "user"],

  computed: {
    disabled() {
      return !this.message;
    },
  },

  methods: {
    sendMsg() {
      const postId = 1,
        msg = this.message,
        user = this.user;
      axios.post(`${path}/chat/${postId}`, { user, msg }).then(() => {});
      this.message = "";
    },
  },
};
</script>
