<template>
  <v-form @submit.prevent="sendMsg">
    <v-label>~메시지를 입력하시오~</v-label>
    <v-row>
      <v-col cols="9">
        <v-text-field
          v-model="message"
          required
          autocomplete="off"
        ></v-text-field>
      </v-col>

      <v-col cols="3">
        <v-btn :disabled="disabled" type="submit">send</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
// import axios from "axios";
// const path = "http://localhost:3000/api";
// const headers = {
//   "Content-type": "application/json; charset=UTF-8",
//   Accept: "*/*",
//   "Access-Control-Allow-Origin": "*",
// };

export default {
  // props: ["user"],

  data() {
    return {
      message: "",
    };
  },

  computed: {
    disabled() {
      return !this.message;
    },
  },

  methods: {
    sendMsg() {
      //this.$socket.emit('서버로 보낼 이벤트명', 데이터);
      //this.$socket.on('서버에서 받을 이벤트명', 데이터);

      console.log(`sendChat: ${this.message}`);
      this.$emit("send-message", this.message);
      this.message = "";

      // const postId = 1;
      // const msg = this.message,
      //   user = this.user.userId;
      // axios
      //   .post(`${path}/chats/${postId}`, { user, msg }, headers)
      //   .then((res) => {
      //     console.log(res);
      //   });
      // this.message = "";
    },
  },
};
</script>
