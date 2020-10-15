<template>
  <v-container>
    <h3>{{ thisInputName }}</h3>
    <v-textarea
      filled
      auto-grow
      rows="6"
      row-height="25"
      v-model="solutionText"
      :label="thisInputInfo.label"
      class="mt-2"
    >
    </v-textarea>
  </v-container>
</template>

<script>
export default {
  updated() {
    this.emitChange();
  },
  data() {
    return {
      solutionText: "",
    };
  },
  props: ["thisInputName", "thisInputInfo"],
  methods: {
    emitChange() {
      this.$emit("solutionChanged", this.solutionText);
    },
  },
};
</script>
