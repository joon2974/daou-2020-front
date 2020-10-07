<template>
  <v-layout row wrap pt-1 text-xs-center>
    <v-flex xs12 class="text-center" mt-5>
      <h1 style="color: black">게시글 검색</h1>
    </v-flex>
    <v-container xs6-center>
      <v-flex>
        <v-text-field v-model="keyword" label="검색어를 입력해주세요.">
        </v-text-field>
        <v-btn depressed center color="blue white--text">검색</v-btn>
      </v-flex>
    </v-container>

    <v-container class="v-main__wrap pa-3">
      <div class="container">
        <div class="row">
          <v-card
            class="col col-6 pa-5"
            v-for="(post, index) in posts"
            :key="index"
          >
            <div class="col col-12 v-card v-sheet theme--dark">
              <postCard :post="post" class="col col-12" />
            </div>
          </v-card>
        </div>
      </div>
    </v-container>
  </v-layout>
</template>
<script>
import axios from "axios";
import Card from "../components/Card";
const headers = {
  "Content-type": "application/json; charset=UTF-8",
  Accept: "*/*",
  "Access-Control-Allow-Origin": "*",
};

export default {
  data() {
    return {
      posts: null,
      keyword: "",
    };
  },
  created() {
    const pageNum = 0;
    axios
      .get(`http://localhost:3000/api/posts?pageNum=${pageNum}`, headers)
      .then((data) => {
        console.log(data.data);
        this.posts = [...data.data];
      });
  },
  components: {
    postCard: Card,
  },
};
</script>

