<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6">
        <v-sheet elevation="12" class="mx-2 my-6" rounded>
          <post-info @postInfoEmit="changePostInfo"></post-info>
        </v-sheet>
      </v-col>
      <v-col cols="6">
        <v-sheet elevation="12" class="mx-2 my-6" rounded>
          <problem-info @problemInfoEmit="changeProblemInfo"></problem-info>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-sheet elevation="12" class="mx-2 my-6" rounded>
          <solution-code-placeholder
            @requestCodeHighlight="makeCodePretty"
            @solutionCodeInfoEmit="changeSolutionInfo"
          ></solution-code-placeholder>
        </v-sheet>
      </v-col>
      <v-col cols="6">
        <v-sheet elevation="12" class="mx-2 my-6" rounded>
          <highlighted-code-placeholder
            :solutionCode="solutionCode"
            :selectedLanguage="selectedLanguage"
          >
          </highlighted-code-placeholder>
          <v-row align="center" justify="end">
            <v-btn tile color="success" class="mr-8 mb-4" @click="postPost"
              >게시글 올리기</v-btn
            >
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { httpInfos } from "../../secretStrings";
import { generateCsrfToken } from "../../secretStrings";
import PostInfo from "../components/CreatePostComponents/PostInfo";
import ProblemInfo from "../components/CreatePostComponents/ProblemInfo";
import SolutionCodePlaceholder from "../components/CreatePostComponents/SolutionCodePlaceholder";
import HighlightedCodePlaceholder from "../components/CreatePostComponents/HighlightedCodePlaceholder";

export default {
  data() {
    return {
      solutionCode: `int main() {printf("Please input your code!"); return 0;}`,
      selectedLanguage: "clike",
      requestDto: {
        title: "",
        content: "",
        problemTitle: "",
        problemLink: "",
        problemSite: "",
        language: "",
        code: "",
        userId: "",
      },
    };
  },
  computed: {
    ...mapState(["userId", "accessToken"]),
  },
  components: {
    "post-info": PostInfo,
    "problem-info": ProblemInfo,
    "solution-code-placeholder": SolutionCodePlaceholder,
    "highlighted-code-placeholder": HighlightedCodePlaceholder,
  },
  methods: {
    makeCodePretty(solutionCode, selectedLanguage) {
      this.selectedLanguage = selectedLanguage;
      this.solutionCode = solutionCode;
    },
    changePostInfo(postTitle, problemSolution) {
      this.requestDto.title = postTitle;
      this.requestDto.content = problemSolution;
    },
    changeProblemInfo(problemInfoObject) {
      this.requestDto.problemTitle = problemInfoObject.problemTitle;
      this.requestDto.problemLink = problemInfoObject.problemLink;
      this.requestDto.problemSite = problemInfoObject.problemSite;
    },
    changeSolutionInfo(solutionInfoObject) {
      this.requestDto.language = solutionInfoObject.language;
      this.requestDto.code = solutionInfoObject.code;
    },
    checkRequestDto(requestDto) {
      const attributes = Object.values(requestDto).map((v) => v.length);
      for (let i = 0; i < attributes.length; i++) {
        if (attributes[i] === 0) {
          return false;
        }
      }
      return true;
    },
    postPost() {
      this.$children[0].$children[0].sendDataToParent();
      this.$children[1].$children[0].sendDataToParent();
      this.$children[2].$children[0].sendDataToParent();
      this.requestDto.userId = this.userId;

      if (
        !(this.requestDto === undefined || this.requestDto === null) &&
        !this.checkRequestDto(this.requestDto)
      ) {
        alert("빈칸을 모두 채워주세요!");
        return;
      }

      this.setCsrfToken();

      axios
        .post(
          `${httpInfos.resourceHost}/posts`,
          this.requestDto,
          httpInfos.headers
        )
        .then(() => {
          alert("게시글 작성 성공!");
          this.$router.push("/");
        })
        .catch((e) => {
          alert("게시글 작성에 실패했어요");
          console.log(e);
        });

      this.removeCsrfToken();
    },
    setCsrfToken() {
      const csrfToken = generateCsrfToken().replace(/=/gi, "");
      this.$cookies.set("CSRF_TOKEN", csrfToken);

      axios.defaults.headers.common["CSRF_TOKEN"] = csrfToken;
      axios.defaults.headers.common["CSRF_TOKEN_IN_COOKIE"] = this.$cookies.get("CSRF_TOKEN");
    },
    removeCsrfToken() {
      delete axios.defaults.headers.common["CSRF_TOKEN"];
      delete axios.defaults.headers.common["CSRF_TOKEN_IN_COOKIE"];
      this.$cookies.remove("CSRF_TOKEN");
    }
  },
};
</script>
