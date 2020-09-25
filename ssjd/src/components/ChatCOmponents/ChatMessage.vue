<template>
  <div>
    <v-list-item>
      <!-- userId_left -->
      <v-list-item-action>
        <label>{{ userId }} : </label>
        <!-- <v-label>{{userId}} : </v-label> -->
        <!-- <= ?? -->
        <!-- <v-text-field class="pa-0" v-model="userId" rows="1" readonly dense size="3">
                </v-text-field> -->
      </v-list-item-action>
      <!-- msg content -->
      <v-list-item-content>
        <v-textarea
          label="userId"
          readonly
          dense
          rows="1"
          outlined
          :value="content"
          auto-grow
        >
          <!-- <template slot="label">{{userId}}</template> -->
          <template v-slot:label>{{ userId }}</template>
        </v-textarea>
      </v-list-item-content>
      <!-- send date -->
      <!-- <v-list-item-action>
                <v-text-field class="pa-0" v-model="convertedDate" rows="1" readonly dense size="3">
                </v-text-field>
            </v-list-item-action> -->
    </v-list-item>
  </div>
</template>

<script>
export default {
  props: {
    msgId: Number,
    userId: Number,
    postId: Number,
    content: String,
    createdDate: Date,
  },

  computed: {
    convertedDate: function() {
      var month = "" + (this.createdDate.getMonth() + 1),
        day = "" + this.createdDate.getDate(),
        year = this.createdDate.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
  },

  methods: {},

  data() {
    return {};
  },
};
</script>

<style>
v-text-field {
  font-size: 10;
}

.subText {
  font-size: "1";
}
</style>
