<template>
  <v-container>
    <v-row class="ml-3">
      <h1>풀이 코드</h1>
    </v-row>
    <v-divider></v-divider>
    <v-row class="ml-1">
      <selection-radio
        :selections="languageList"
        :initialValue="languageList[0].value"
        selectionName="사용 언어 선택"
        @selectionChanged="changeLanguage"
        class="mt-1"
      >
      </selection-radio>
    </v-row>
    <v-divider></v-divider>
    <v-row class="ml-1">
      <v-container>
        <h3>풀이 코드 입력</h3>
        <v-textarea
          filled
          auto-grow
          rows="10"
          row-height="30"
          v-model="problemSolution"
          label="문제 풀이 입력"
          class="mt-2"
        >
        </v-textarea>
        <v-row align="center" justify="end">
          <v-btn
            tile
            color="success"
            class="mr-4"
            @click="requestCodeHighlight"
          >
            <v-icon left> mdi-check </v-icon>
            Code Check
          </v-btn>
        </v-row>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import SelectionRadio from "./SelectionRadio";

export default {
  data() {
    return {
      selectedLanguage: "c",
      languageList: [
        { label: "C++", color: "primary", value: "c" },
        { label: "Java", color: "secondary", value: "java" },
        { label: "Python", color: "success", value: "python" },
        { label: "Javascript", color: "info", value: "javascript" },
      ],
      problemSolution: "",
    };
  },
  components: {
    "selection-radio": SelectionRadio,
  },
  methods: {
    changeLanguage(radioValue) {
      this.selectedLanguage = radioValue;
    },
    requestCodeHighlight() {
      this.$emit(
        "requestCodeHighlight",
        this.problemSolution,
        this.selectedLanguage
      );
    },
    sendDataToParent() {
      let solutionInfo = {};
      solutionInfo.language = this.selectedLanguage;
      solutionInfo.code = this.problemSolution;

      this.$emit("solutionCodeInfoEmit", solutionInfo);
    },
  },
};
</script>
