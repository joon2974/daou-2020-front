<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col>
        <post-card
          v-for="p in posts"
          :post="p"
          :key="p.postId"
          cols="6"
        ></post-card>
      </v-col>
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
    };
  },
  components: {
    "post-card": Card,
  },
  created: function () {
    const pageNum = 0;
    axios
      .get(`http://localhost:3000/api/posts?pageNum=${pageNum}`, headers)
      .then((data) => {
        console.log(data);
        this.posts = [...data.data.content];
        console.log(this.posts);
      });
  },
};
</script>
