<template>
  <v-container>
    <v-row class="ml-3">
      <h1>문제 정보</h1>
    </v-row>
    <v-divider></v-divider>
    <v-row class="ml-1">
      <selection-radio
        :selections="platformList"
        :initialValue="platformList[0].value"
        selectionName="문제 출처 선택"
        @selectionChanged="changePlatform"
        class="mt-1"
      >
      </selection-radio>
    </v-row>
    <v-divider></v-divider>
    <v-row class="ml-1">
      <input-post-info
        inputInfoName="문제 이름"
        :thisInputInfo="problemTitleInfo"
        @inputChanged="changeProblemTitle"
        class="mt-0"
      >
      </input-post-info>
    </v-row>
    <v-divider></v-divider>
    <v-row class="ml-1">
      <input-post-info
        inputInfoName="문제 링크"
        :thisInputInfo="problemLinkInfo"
        @inputChanged="changeProblemLink"
        class="mt-0"
      >
      </input-post-info>
    </v-row>
  </v-container>
</template>

<script>
import SelectionRadio from "../CreatePostComponents/SelectionRadio";
import InputPostInfo from "../CreatePostComponents/InputPostInfo";

export default {
  data() {
    return {
      selectedPlatform: "백준",
      problemTitle: "",
      problemLink: "",
      platformList: [
        { label: "백준", color: "primary", value: "백준" },
        { label: "프로그래머스", color: "secondary", value: "프로그래머스" },
      ],
      problemTitleInfo: {
        maxCount: 220,
        rules: [
          (info) => !!info || "문제 제목을 입력해 주세요!",
          (info) => (info && info.length <= 220) || "문제 제목이 너무 길어요ㅠ",
        ],
        label: "문제 제목",
      },
      problemLinkInfo: {
        maxCount: 220,
        rules: [
          (info) => !!info || "링크를 입력해 주세요!",
          (info) => (info && info.length <= 220) || "링크가 너무 길어요ㅠ",
        ],
        label: "문제 링크",
      },
    };
  },
  components: {
    "selection-radio": SelectionRadio,
    "input-post-info": InputPostInfo,
  },
  methods: {
    changePlatform(platformValue) {
      this.selectedPlatform = platformValue;
    },
    changeProblemTitle(problemTitleValue) {
      this.problemTitle = problemTitleValue;
    },
    changeProblemLink(problemLinkValue) {
      this.problemLink = problemLinkValue;
    },
    sendDataToParent() {
      let problemInfo = {};
      problemInfo.problemTitle = this.problemTitle;
      problemInfo.problemLink = this.problemLink;
      problemInfo.problemSite = this.selectedPlatform;

      if (!this.checkDetailUrl(this.problemLink)) {
        alert("올바른 URL 형식을 입력해 주세요!");
        return ;
      }

      this.$emit("problemInfoEmit", problemInfo);
    },
    checkDetailUrl(strUrl) {
      const expUrl = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;
      return expUrl.test(strUrl);
    }
  },
};
</script>
