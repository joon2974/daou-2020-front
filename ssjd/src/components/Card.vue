<template>
  <v-col cols="6">
    <v-card class="ma-10" max-width="700px">
      <v-row justify="center">
        <v-img
          @click="InPost()"
          class="white--text align-end"
          max-width="500px"
          max-height="300px"
          :src="this.imageSrc"
          @mouseover="mouseover()"
          @mouseleave="mouseleave()"
        >
          <v-card-title :class="h1Class"
            >{{ this.post.problem.problemSite }} -
            {{ this.post.problem.problemTitle }}
          </v-card-title>
        </v-img>
      </v-row>

      <v-card-subtitle class="pb-0">
        {{ this.post.title }}
      </v-card-subtitle>

      <v-card-text class="text--primary">
        <div>
          <b>{{ this.post.content }}</b>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn color="green" text outlined>
          {{ this.post.user.nickname }}
        </v-btn>

        <v-btn @click="inThePosts" color="orange" text outlined>
          {{ this.post.problem.problemTitle }}
        </v-btn>

        <v-btn color="purple" text outlined>
          {{ this.post.language }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      h1Class: "text-h6",
    };
  },
  props: ["post", "imageSrc"],
  methods: {
    inThePosts() {
      window.open(`${this.post.problem.problemLink}`);
    },
    InPost() {
      console.log(this.post.postId);
      this.$router.push("/chat/" + this.post.postId);
    },
    mouseover() {
      this.h1Class = "text-h3";
    },
    mouseleave() {
      this.h1Class = "text-h6";
    },
  },
};
</script>
