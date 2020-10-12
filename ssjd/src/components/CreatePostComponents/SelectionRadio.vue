<template>
  <v-container>
    <h3>{{ selectionName }}</h3>
    <v-radio-group v-model="radioValue" row>
      <v-radio
        v-for="(selection, index) in selections"
        :key="index"
        :label="selection.label"
        :color="selection.color"
        :value="selection.value"
      ></v-radio>
    </v-radio-group>
  </v-container>
</template>

<script>
export default {
  created() {
    this.setValue();
  },
  updated() {
    this.emitChange();
  },
  data() {
    return {
      radioValue: "",
    };
  },
  props: ["selections", "initialValue", "selectionName"],
  methods: {
    setValue() {
      this.radioValue = this.initialValue;
    },
    emitChange() {
      this.$emit("selectionChanged", this.radioValue);
    },
  },
};
</script>
