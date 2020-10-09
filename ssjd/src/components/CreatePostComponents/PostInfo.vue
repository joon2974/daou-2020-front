<template>
  <v-container>
    <v-row class="ml-3">
      <h1>게시글 정보</h1>
    </v-row>
    <v-divider></v-divider>
    <v-row class="ml-1">
      <input-post-info
        inputInfoName="글 제목"
        :thisInputInfo="postTitleInfo"
        @inputChanged="changePostTitle"
        class="mt-0"
      >
      </input-post-info>
    </v-row>
    <v-divider></v-divider>
    <v-row class="ml-1">
      <input-problem-solution
        thisInputName="문제 풀이"
        :thisInputInfo="problemSolutionInfo"
        @solutionChanged="changeProblemSolution"
        class="mt-0"
      ></input-problem-solution>
    </v-row>
  </v-container>
</template>

<script>
import InputPostInfo from "../CreatePostComponents/InputPostInfo";
import InputProblemSolution from "../CreatePostComponents/InputProblemSolution";

export default {
  updated() {
    this.sendDataToParent();
  },
  data() {
    return {
      postTitle: "",
      problemSolution: "",
      postTitleInfo: {
        maxCount: 220,
        rules: [
          (info) => !!info || "글 제목을 입력해 주세요!",
          (info) => (info && info.length <= 220) || "글 제목이 너무 길어요ㅠ",
        ],
        label: "글 제목",
      },
      problemSolutionInfo: {
        label: "문제 풀이",
      },
    };
  },
  components: {
    "input-post-info": InputPostInfo,
    "input-problem-solution": InputProblemSolution,
  },
  methods: {
    changePostTitle(postTitleValue) {
      this.postTitle = postTitleValue;
    },
    changeProblemSolution(solutionText) {
      this.problemSolution = solutionText;
    },
    sendDataToParent() {
      this.$emit("postInfoEmit", this.postTitle, this.problemSolution);
    },
  },
};
</script>
