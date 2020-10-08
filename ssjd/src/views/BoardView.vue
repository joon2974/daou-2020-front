<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-flex xs12 class="text-center" mt-3> </v-flex>
      <v-container>
        <v-flex xs12 offset-xs4>
          <v-row>
            <v-text-field
              label="검색어를 입력해주세요."
              v-model="keyword"
              prepend-icon="mdi-magnify"
              rounded
              class="shrink"
              outline
              centered-input
              v-on:keypup="onkeyup"
              v-on:submit.prevent="onSearch"
            >
            </v-text-field>
            <v-btn
              depressed
              center
              color="blue white--text"
              v-show="keyword.length"
              v-on:click="onReset"
              type="reset"
              class="btn-reset"
              >검색</v-btn
            >
          </v-row>
        </v-flex>
        <v-flex xs12>
          <v-card>
            <v-card-text>
              <v-container fluid>
                <v-layout row wrap ma-0>
                  <v-flex xs10 sm5 md5 offset-xs2>
                    <v-radio-group v-model="ex7" column>
                      <v-radio
                        label="프로그래머스"
                        color="primary"
                        value="programmers"
                        @click="chageSite('programmers')"
                      ></v-radio>
                      <v-radio
                        label="백준"
                        color="primary"
                        value="backjun"
                        name="backjun"
                        @click="chageSite('backjun')"
                      ></v-radio>
                    </v-radio-group>
                  </v-flex>
                  <v-flex xs10 sm5 md5>
                    <v-radio-group v-model="ex8" column>
                      <v-radio
                        label="C++"
                        color="error"
                        value="C++"
                        @click="chageLanguage('C++')"
                      ></v-radio>
                      <v-radio
                        label="Java"
                        color="error"
                        value="Java"
                        @click="chageLanguage('Java')"
                      ></v-radio>
                      <v-radio
                        label="Javascript"
                        color="error"
                        value="Javascript"
                        @click="chageLanguage('Javascript')"
                      ></v-radio>
                      <v-radio
                        label="Python"
                        color="error"
                        value="Python"
                        @click="chageLanguage('Python')"
                      ></v-radio>
                    </v-radio-group>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-container>
      <post-card
        v-for="(post, index) in posts"
        :key="index"
        :imageSrc="srcs[index % 6]"
        :post="post"
      >
      </post-card>
      <infinite-loading @infinite="infiniteHandler" spinner="spiral">
        <div
          slot="no-more"
          style="color: rgb(102, 102, 102); font-size: 14px; padding: 10px 0px;"
        >
          목록의 끝입니다 :)
        </div>
      </infinite-loading>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
import Card from "../components/Card";
import InfiniteLoading from "vue-infinite-loading";

const headers = {
  "Content-type": "application/json; charset=UTF-8",
  Accept: "*/*",
  "Access-Control-Allow-Origin": "*",
};

export default {
  data() {
    return {
      posts: [],
      limit: 0,
      language: "",
      beforeLanguage: "",
      site: "",
      beforeSite: "",
      keyword: "",
      srcs: null,
      item: 0,
      ex7: "primary",
      ex8: "red",
      api: [`http://localhost:3000/api/posts?pageNum=0`],
    };
  },
  name: "Topic",
  components: {
    "post-card": Card,
    "infinite-loading": InfiniteLoading,
  },
  created() {
    this.srcs = this.$store.state.cardImages;
    axios
      .get(`http://localhost:3000/api/posts?pageNum=0`, headers)
      .then((data) => {
        this.posts = [...data.data];
      });
    console.log(this.posts);
  },
  methods: {
    infiniteHandler($state) {
      const EACH_LEN = 6;
      let language = this.language;
      let site = this.site;
      console.log(language);
      console.log(site);
      fetch("http://localhost:3000/api/posts?pageNum=" + this.limit, {
        method: "get",
      })
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          setTimeout(() => {
            if (data.length) {
              this.posts = this.posts.concat(data);
              $state.loaded();
              this.limit += 1;

              if (data.length / EACH_LEN < 1) {
                $state.complete();
              }
            } else {
              $state.complete();
            }
          }, 500);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    onSearch(e) {},
    onkeyup() {
      if (!this.keyword.length) this.onReset();
    },
    onReset() {
      this.keyword = "";
      debugger;
    },
    chageSite(value) {
      this.site = value;
    },
    chageLanguage(value) {
      console.log(this.site);
      console.log("??");
      this.language = value;
      this.posts = [];
      if (this.site == "" || this.site == null) {
        console.log("실행");
        axios
          .get(
            `http://localhost:3000/api/posts/language/` + value + `?pageNum=0`,
            headers
          )
          .then((data) => {
            this.posts = [...data.data];
          });
      } else {
        console.log("안실행" + this.site);
      }
    },
  },
};
</script>
<style scoped>
.v-text-field {
  width: 400px;
}
</style>
