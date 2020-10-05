<template>
  <div>
    <label v-show="messages.length === 0" style="color:gray"
      >Start Chatting
    </label>

    <div class="justify-center" v-for="(msg, index) in messages" :key="index">
      <!-- Q. center로 ㅠㅠ -->
      <!-- <label class="align-self-center">date</label> -->
      <v-list-item>
        <!-- userId_left -->
        <v-list-item-action class="justify-self-start">
          <!-- <label>{{ msg.users.nickname }} : </label> -->
          <v-avatar color="primary">
            <!-- <span class="white--text">{{ msg.users.nickname }}</span> -->
            <v-icon dark>
              mdi-account-circle
            </v-icon>
            <!-- <img src="../../assets/logo.png" :alt="msg.users.nickname" /> -->
          </v-avatar>
          <label class="align-self-center">{{ msg.users.nickname }}</label>
        </v-list-item-action>

        <!-- msg content -->
        <v-list-item-content>
          <v-textarea
            :value="msg.content"
            readonly
            dense
            rows="1"
            outlined
            auto-grow
            hide-details
          >
            <!-- <template v-slot:label>{{ msg.users.nickname }}</template> -->
          </v-textarea>

          <!-- send date -->
          <div class="timestamp">
            {{ convertedDate(msg.createdDate) }}
          </div>
        </v-list-item-content>
      </v-list-item>
    </div>
  </div>
</template>

<script>
export default {
  props: ["messages"],

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
