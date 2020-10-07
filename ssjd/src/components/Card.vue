<template>
  <v-col cols="6">
    <v-card class="mx-auto">
      <v-img class="white--text align-end" height="200px" :src="this.imageSrc">
        <v-card-title
          >{{ this.post.problem.problemSite }} -
          {{ this.post.problem.problemTitle }}
        </v-card-title>
      </v-img>

      <v-card-subtitle class="pb-0">
        {{ this.post.title }}
      </v-card-subtitle>

      <v-card-text class="text--primary">
        <div>
          <b>{{ this.post.content }}</b>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn color="purple" text>
          {{ this.post.user.nickname }}
        </v-btn>

        <v-btn @click="inThePosts" color="orange" text>
          {{ this.post.problem.problemTitle }}
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
