<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <post-card
        v-for="(p, index) in posts"
        :post="p"
        :key="p.postId"
        :imageSrc="cardImages[index]"
      ></post-card>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
import Card from "../components/Card";
import { httpInfos } from "../../secretStrings";
import { generateCsrfToken } from "../../secretStrings";

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
    };
  },
  components: {
    "post-card": Card,
  },
  created: function() {
    const pageNum = 0;
    const csrfToken = generateCsrfToken().replace(/=/gi, "");
    this.$cookies.set("CSRF_TOKEN", csrfToken);

    axios.defaults.headers.common["CSRF_TOKEN"] = csrfToken;
    axios.defaults.headers.common["CSRF_TOKEN_IN_COOKIE"] = this.$cookies.get("CSRF_TOKEN");

    axios
      .get(
        `http://localhost:3000/api/posts?pageNum=${pageNum}`,
        httpInfos.headers
      )
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
};
</script>
