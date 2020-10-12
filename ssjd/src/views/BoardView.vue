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
              autocomplete="off"
            >
            </v-text-field>
            <v-btn
              depressed
              center
              color="blue white--text"
              v-show="keyword.length"
              v-on:click="search(keyword)"
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
                        value="프로그래머스"
                        @click="chageSite('프로그래머스')"
                      ></v-radio>
                      <v-radio
                        label="백준"
                        color="primary"
                        value="백준"
                        name="siteRadio"
                        @click="chageSite('백준')"
                      ></v-radio>
                    </v-radio-group>
                    <v-btn tile color="primary" @click="reset()">
                      <v-icon left> mdi-pencil </v-icon>
                      초기화
                    </v-btn>
                  </v-flex>
                  <v-flex xs10 sm5 md5>
                    <v-radio-group v-model="ex8" column>
                      <v-radio
                        label="C++"
                        color="error"
                        value="c"
                        @click="chageLanguage('c')"
                      ></v-radio>
                      <v-radio
                        label="Java"
                        color="error"
                        value="java"
                        @click="chageLanguage('java')"
                      ></v-radio>
                      <v-radio
                        label="Javascript"
                        color="error"
                        value="javascript"
                        @click="chageLanguage('javascript')"
                      ></v-radio>
                      <v-radio
                        label="Python"
                        color="error"
                        value="python"
                        @click="chageLanguage('python')"
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
          style="color: rgb(102, 102, 102); font-size: 14px; padding: 10px 0px"
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
      cardImages: [
        "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
        "https://picsum.photos/500/300?image=2",
        "https://picsum.photos/500/300?image=39",
        "https://picsum.photos/500/300?image=60",
      ],
      limit: 0,
      language: "",
      site: "",
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
        console.log(data);
        this.posts = [...data.data];
        console.log(this.posts);
      })
      .catch((err) => {
        console.log(`Board View Err: ${err}`);
        this.$router.push("/signin");
      });

    delete axios.defaults.headers.common["CSRF_TOKEN"];
    delete axios.defaults.headers.common["CSRF_TOKEN_IN_COOKIE"];
    this.$cookies.remove("CSRF_TOKEN");
  },
  methods: {
    infiniteHandler($state) {
      const EACH_LEN = 6;
      let language = this.language;
      let site = this.site;
      let keyword = this.keyword;
      console.log(language);
      console.log(site);
      console.log("keyword" + keyword);
      if (language.length === 0 && site.length === 0) {
        console.log("기본 Paging 실행");
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
      } else if (language.length !== 0) {
        console.log("language it not NULL");
        if (site.length !== 0) {
          // 통합 실행
          console.log("통합 실행");
          fetch(
            `http://localhost:3000/api/posts/problem/language?language=` +
              this.language +
              `&pageNum=` +
              this.limit +
              `&problemSite=` +
              this.site,
            {
              method: "get",
            }
          )
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
        } else {
          // language 실행
          console.log(`language로 실행!`);
          fetch(
            `http://localhost:3000/api/posts/language/` +
              this.language +
              `?pageNum=` +
              this.limit,
            {
              method: "get",
            }
          )
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
        }
      } else {
        // problem
        console.log("problem 으로 실행");
        fetch(
          `http://localhost:3000/api/posts/problem/` +
            this.site +
            `?pageNum=` +
            this.limit,
          {
            method: "get",
          }
        )
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
      }
    },
    // onSearch(e) {},
    onkeyup() {
      if (!this.keyword.length) this.onReset();
    },
    onReset() {
      this.keyword = "";
      // debugger;
    },
    reset() {
      window.location.reload().prevent();
    },
    chageSite(value) {
      this.site = value;
      this.post = [];

      if (this.language.length === 0) {
        axios
          .get(
            `http://localhost:3000/api/posts/problem/` + value + `?pageNum=0`,
            headers
          )
          .then((data) => {
            this.posts = [...data.data];
          });
      } else {
        this.changePlatform(this.site, this.language);
      }
    },
    chageLanguage(value) {
      console.log(this.site);
      this.language = value;
      this.posts = [];
      if (this.site.length === 0) {
        axios
          .get(
            `http://localhost:3000/api/posts/language/` + value + `?pageNum=0`,
            headers
          )
          .then((data) => {
            this.posts = [...data.data];
          });
      } else {
        this.changePlatform(this.site, this.language);
      }
    },
    changePlatform(site, language) {
      console.log(`통합으로 리스트 불러오기`);
      this.posts = [];
      axios
        .get(
          `http://localhost:3000/api/posts/problem/language?language=` +
            language +
            `&pageNum=0&problemSite=` +
            site,
          headers
        )
        .then((data) => {
          this.posts = [...data.data];
        });
    },
    search(keyword) {
      console.log(keyword + "검색");
      this.posts = [];
      console.log("site : " + this.site);
      console.log("lang :: " + this.language);
      axios
        .get(
          `http://localhost:3000/api/posts/search/` + keyword + `?pageNum=0`,
          headers
        )
        .then((data) => {
          this.posts = [...data.data];
        });
    },
  },
};
</script>
<style scoped>
.v-text-field {
  width: 400px;
}
</style>
