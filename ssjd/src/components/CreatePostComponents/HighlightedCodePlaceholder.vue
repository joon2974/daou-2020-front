<template>
  <v-container>
    <v-row class="ml-3">
      <h1>소스 코드 확인</h1>
    </v-row>
    <v-divider></v-divider>
    <v-row class="ml-1">
      <v-container>
        <h3>풀이 소스 코드</h3>
        <prism :language="selectedLanguage">{{ solutionCode }}</prism>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import Prism from "vue-prism-component";

export default {
  props: ["solutionCode", "selectedLanguage"],
  components: {
    Prism,
  },
};
</script>
