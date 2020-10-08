<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-flex xs12 class="text-center" mt-5> </v-flex>
      <v-container>
        <v-flex xs12 offset-xs7>
          <v-row>
            <v-text-field
              label="검색어를 입력해주세요."
              v-model="keyword"
              prepend-icon="mdi-magnify"
              rounded
              class="shrink"
              outline
              centered-input
            >
            </v-text-field>
            <v-btn depressed center color="blue white--text">검색</v-btn>
          </v-row>
        </v-flex>
      </v-container>
      <post-card
        v-for="(post, index) in posts"
        :key="index"
        :imageSrc="srcs[index % 6]"
        :post="post"
        cols="6"
      >
      </post-card>
      <infinite-loading @infinite="infiniteHandler" spinner="waveDots">
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
      srcs: null,
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
              console.log("after", this.posts.length, this.limit);

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
  },
};
</script>
<style scoped>
/deep/ .v-text-field {
  width: 400px;
}
</style>
