<template>
  <div>
    <v-list-item>
      <!-- userId_left -->
      <v-list-item-action>
        <label>{{ nickName }} : </label>
      </v-list-item-action>

      <!-- msg content -->
      <v-list-item-content>
        <v-textarea
          :value="content"
          label="userId"
          readonly
          dense
          rows="1"
          outlined
          auto-grow
          hide-details
        >
          <template v-slot:label>{{ userId }}</template>
        </v-textarea>

        <!-- send date -->
        <div class="timestamp">
          {{ convertedDate }}
        </div>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
export default {
  props: {
    msgId: Number,
    userId: Number,
    nickName: String,
    postId: Number,
    content: String,
    createdDate: Date,
  },

  computed: {
    convertedDate: function() {
      var hour = "" + this.createdDate.getHours(),
        min = "" + this.createdDate.getMinutes();
      // month = "" + (this.createdDate.getMonth() + 1),
      // day = "" + this.createdDate.getDate(),

      // if (month.length < 2) month = "0" + month;
      // if (day.length < 2) day = "0" + day;
      if (min.length < 2) min = "0" + min;

      // day = [month, day].join("-");
      // var time = [hour, min].join(":");
      return [hour, min].join(":");
    },
  },

  methods: {},

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
