<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-combobox
          v-model="select"
          :items="items"
          label="Language"
        ></v-combobox>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-textarea
          label="Code Example"
          :value="codeOverall"
          readonly
          outlined
          auto-grow
        >
        </v-textarea>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    codeOverall: String,
  },

  components: {},

  data() {
    return {
      select: "",
      items: ["Java", "C++", "Python", "Javascript"],
    };
  },
};
</script>
