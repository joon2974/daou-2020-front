<template>
  <v-form @submit.prevent="sendMsg">
    <v-label>~메시지를 입력하시오~</v-label><br />
    <!-- user정보 -->
    <v-label
      >내 id : <strong>{{ nickName }}</strong></v-label
    >
    <v-row>
      <!-- 메시지 입력칸 -->
      <v-col cols="9">
        <v-text-field
          v-model="message"
          required
          autocomplete="off"
          counter
          maxlength="150"
        ></v-text-field>
      </v-col>

      <!-- 전송버튼 -->
      <v-col cols="3">
        <v-btn :disabled="disabled" type="submit">send</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["connected"],

  data() {
    return {
      message: "",
    };
  },

  computed: {
    ...mapState(["nickName"]),

    disabled() {
      return this.connected === false || !this.message;
    },
  },

  methods: {
    sendMsg() {
      this.$emit("send-message", this.message);
      this.message = "";
    },
  },
};
</script>
