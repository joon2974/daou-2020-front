<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-2>
        <profile></profile>
        <v-divider></v-divider>
        <v-sheet elevation="12" class="mx-auto my-2 py-2" rounded>
          <card :post="dummy"></card>
        </v-sheet>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Profile from "../components/MypageComponents/Profile";
import Card from "../components/MypageComponents/Card";

export default {
  data() {
    return {
      dummy: {
        title: "제목",
        problem: {
          problemType: "타입",
          problemTitle: "문제 이름",
        },
        content: "콘텐트",
      },
    };
  },
  components: {
    profile: Profile,
    card: Card,
  },
};
</script>
