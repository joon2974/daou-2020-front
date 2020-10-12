<template>
  <v-card>
    <!-- received message -->
    <v-card-text>
      <v-label>채팅 목록</v-label>
      <v-list class="elevation-1 pa-5">
        <message-list
          :messages="messages"
          :connected="connected"
          @re-connect="reConnect"
        >
        </message-list>
      </v-list>
    </v-card-text>

    <v-divider></v-divider>

    <!-- enter message -->
    <my-chat
      class="pa-5"
      @send-message="sendMsg"
      :connected="connected"
    ></my-chat>
  </v-card>
</template>

<script>
import SendChat from "@/components/ChatComponents/SendChat";
import ChatList from "@/components/ChatComponents/ChatList";

export default {
  components: {
    "my-chat": SendChat,
    "message-list": ChatList,
  },

  props: ["messages", "connected"],

  methods: {
    sendMsg(message) {
      this.$emit("send-message", message);
    },

    reConnect() {
      this.$emit("re-connect");
    },
  },
};
</script>

<style></style>
