<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <post-card
        v-for="(post, index) in posts"
        :key="index"
        :imageSrc="srcs[index]"
        :post="post"
        cols="6"
      >
      </post-card>
    </v-row>
  </v-container>
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
      posts: [],
      srcs: null,
    };
  },
  components: {
    "post-card": Card,
  },
  created() {
    this.srcs = this.$store.state.cardImages;
    const pageNum = 0;
    axios
      .get(`http://localhost:3000/api/posts?pageNum=${pageNum}`, headers)
      .then((data) => {
        this.posts = [...data.data];
      });
    console.log(this.posts);
  },
};
</script>
