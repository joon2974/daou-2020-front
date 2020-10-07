<template>
  <div>
    <label
      v-show="!messages || (messages && messages.length === 0)"
      style="color:gray;"
      >Start Chatting
    </label>

    <div v-for="(msg, index) in messages" :key="index">
      <!-- Q. center로 ㅠㅠ -->
      <v-list-item>
        <!-- 왼쪽: user 정보 -->
        <v-list-item-action class="justify-center">
          <v-avatar class="mb-1 align-self-center" color="primary">
            <v-icon dark>
              mdi-account-circle
            </v-icon>
          </v-avatar>
          <label class="align-self-center">{{ msg.users.nickname }}</label>
        </v-list-item-action>

        <!-- 오른쪽: 메시지 -->
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
export default {
  props: ["messages", "connected"],

  computed: {},

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
      console.log(`reConnect`);
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
