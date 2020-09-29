<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-combobox
          v-model="select"
          :items="items"
          label="Language"
          class="pl-2"
          readonly
        ></v-combobox>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-textarea
          label="Code"
          :value="codeOverall"
          readonly
          outlined
          auto-grow
          hide-details
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
    select: String,
  },

  components: {},

  data() {
    return {
      // select: "",
      items: ["Java", "C++", "Python", "Javascript"],
    };
  },
};
</script>
