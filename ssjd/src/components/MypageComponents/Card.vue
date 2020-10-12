<template>
  <v-col cols="6">
    <v-card class="mx-auto" max-width="700">
      <v-img class="white--text align-end" height="200px" :src="imageSrc">
        <v-card-title>{{ post.title }}</v-card-title>
      </v-img>

      <v-card-subtitle class="pb-0">
        {{ post.problem.problemType }}
      </v-card-subtitle>

      <v-card-text class="text--primary">
        <div>
          <b>{{ post.content }}</b>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="inThePosts" color="orange" text>
          {{ post.problem.problemTitle }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: ["post", "imageSrc"],
  methods: {
    inThePosts() {
      window.open(`${this.post.problem.problemLink}`);
    },
  },
};
</script>
