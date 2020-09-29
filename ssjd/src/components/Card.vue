<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title>{{ this.post.title }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">
      {{ this.post.problem.problemType }}
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div><b>{{ this.post.content }}</b></div>
    </v-card-text>

    <v-card-actions>
      <v-btn @click="inThePosts"
        color="orange"
        text
      >
        {{ this.post.problem.problemTitle }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    props: ['post'],
    methods: {
        inThePosts() {
            console.log(this.post)
            window.open("http://localhost:3000/posts/"+ this.post.postId , "_blank");
        }
    }
};
</script>
