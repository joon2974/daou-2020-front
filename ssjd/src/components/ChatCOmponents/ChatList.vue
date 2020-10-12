<template>
  <div>
    <label
      v-show="!messages || (messages && messages.length === 0)"
      style="color:gray;"
      >Start Chatting
    </label>

    <div v-for="(msg, index) in messages" :key="index">
      <v-list-item v-if="msg.messageId === 0">
        <v-list-item-content>
          <v-textarea
            class="pa-2"
            style="border: 1px solid lightgray ;"
            :value="msg.users.nickname + '님이 들어왔습니다.'"
            flat
            solo
            readonly
            dense
            rows="1"
            auto-grow
            hide-details
          >
          </v-textarea>
        </v-list-item-content>
      </v-list-item>
      
      <v-list-item v-else>
        <!-- 왼쪽: 메시지를 보낸 다른 user 정보 -->
        <userProfile
          v-show="msg.users.userId !== userId"
          :nickname="msg.users.nickname"
        ></userProfile>

        <!-- 메시지 -->
        <v-list-item-content>
          <v-textarea
            class="pa-2"
            :value="msg.content"
            solo
            readonly
            dense
            rows="1"
            auto-grow
            hide-details
          >
          </v-textarea>

          <!-- send date -->
          <div class="timestamp">
            {{ convertedDate(msg.createdDate) }}
          </div>
        </v-list-item-content>

        <!-- 오른쪽: 메시지를 보낸 내 user 정보 -->
        <userProfile
          v-show="msg.users.userId === userId"
          :nickname="msg.users.nickname"
        ></userProfile>
      </v-list-item>
    </div>

    <!-- 연결이 끊어졌을 때 -->
    <div v-show="connected === false" style="border: 1px solid lightgray ;">
      <v-list-item style="display: inline-flex;">
        <v-list-item-title>연결이 끊어졌습니다</v-list-item-title>
        <v-list-item-action>
          <v-btn type="submit" elevation="1" @click="reConnect()">재연결</v-btn>
        </v-list-item-action>
      </v-list-item>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UserProfile from "@/components/ChatComponents/UserProfile";

export default {
  props: ["messages", "connected"],

  components: {
    userProfile: UserProfile,
  },

  computed: {
    ...mapState(["userId"]),
  },

  methods: {

    convertedDate: function(datetime) {
      var date = new Date(datetime);
      var hour = "" + date.getHours(),
        min = "" + date.getMinutes(),
        month = "" + (date.getMonth() + 1),
        day = "" + date.getDate();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      if (min.length < 2) min = "0" + min;

      day = [month, day].join("/");
      var time = [hour, min].join(":");
      return [day, time].join(" ");
    },

    reConnect() {
      this.$emit("re-connect");
    },
  },

  data() {
    return {};
  },
};
</script>

<style>

.timestamp {
  padding: 2px 8px;
  margin: 0;
  text-align: right;
  font-size: 10px;
  width: 100%;
}
</style>
