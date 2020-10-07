<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-2>
        <profile></profile>
        <v-sheet elevation="12" class="mx-16 my-2 py-2" rounded>
          <v-container fluid>
            <v-row no-gutters>
              <card
                v-for="(p, index) in posts"
                :key="index"
                :post="p"
                :imageSrc="cardImages[index]"
                class="mb-8"
              ></card>
            </v-row>
          </v-container>
        </v-sheet>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
import { httpInfos } from "../../secretStrings";
import Profile from "../components/MypageComponents/Profile";
import Card from "../components/MypageComponents/Card";

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
  methods: {
    loadData() {
      return axios
        .get(
          `${httpInfos.resourceHost}/posts/users/${this.userId}?pageNum=0`,
          httpInfos.headers
        )
        .then((data) => {
          this.posts = data.data;
        })
        .catch((e) => {
          console.log(`api 에러: ${e}`);
        });
    },
  },
  computed: {
    ...mapState(["userId"]),
  },
  components: {
    profile: Profile,
    card: Card,
  },
  created() {
    this.loadData();
  },
};
</script>
