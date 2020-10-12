<template>
  <v-container>
    <h3>{{ inputInfoName }}</h3>
    <v-text-field
      filled
      v-model="inputData"
      :counter="thisInputInfo.maxCount"
      :rules="thisInputInfo.rules"
      :label="thisInputInfo.label"
      class="mt-2"
    ></v-text-field>
  </v-container>
</template>

<script>
export default {
  updated() {
    this.emitChange();
  },
  data() {
    return {
      inputData: "",
    };
  },
  props: ["inputInfoName", "thisInputInfo"],
  methods: {
    emitChange() {
      this.$emit("inputChanged", this.inputData);
    },
  },
};
</script>
