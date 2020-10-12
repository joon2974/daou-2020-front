<template>
  <v-card>
    <v-card-text>
      <v-label>코드 보기</v-label>
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
    </v-card-text>
  </v-card>
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
