<template>
  <v-card>
    <v-card-text>
      <v-label>코드 보기</v-label>
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-combobox
              v-model="selectedLanguage"
              :items="items"
              label="Language"
              class="pl-2"
              readonly
            ></v-combobox>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <prism :language="selectedLanguage">{{ codeOverall }}</prism>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import Prism from "vue-prism-component";

export default {
  props: {
    codeOverall: String,
    selectedLanguage: String,
  },

  components: {
    Prism,
  },

  data() {
    return {
      items: ["Java", "C++", "Python", "Javascript"],
    };
  },
};
</script>
