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
                :imageSrc="cardImages[index % 6]"
                class="mb-8"
              ></card>
              <infinite-loading @infinite="infiniteHandler" spinner="spiral">
                <div
                  slot="no-more"
                  style="color: rgb(102, 102, 102); font-size: 14px; padding: 10px 0px"
                >
                  목록의 끝입니다 :)
                </div>
              </infinite-loading>
            </v-row>
          </v-container>
        </v-sheet>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from "axios";
import InfiniteLoading from "vue-infinite-loading";
import { mapState } from "vuex";
import { httpInfos } from "../../secretStrings";
import { generateCsrfToken } from "../../secretStrings";
import Profile from "../components/MypageComponents/Profile";
import Card from "../components/Card";

export default {
  data() {
    return {
      posts: [],
      limit: 1,
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
      this.setCsrfToken();

      axios
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

      this.removeCsrfToken();
    },
    setCsrfToken() {
      const csrfToken = generateCsrfToken().replace(/=/gi, "");
      this.$cookies.set("CSRF_TOKEN", csrfToken);

      axios.defaults.headers.common["CSRF_TOKEN"] = csrfToken;
      axios.defaults.headers.common["CSRF_TOKEN_IN_COOKIE"] = this.$cookies.get("CSRF_TOKEN");
    },
    removeCsrfToken() {
      delete axios.defaults.headers.common["CSRF_TOKEN"];
      delete axios.defaults.headers.common["CSRF_TOKEN_IN_COOKIE"];
      this.$cookies.remove("CSRF_TOKEN");
    },
    infiniteHandler($state) {
      const EACH_LEN = 6;
      fetch(`${httpInfos.resourceHost}/posts/users/${this.userId}?pageNum=${this.limit}`,
      {
        method: 'get',
      })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setTimeout(() => {
          if (data.length) {
            this.posts = this.posts.concat(data);
            $state.loaded();
            this.limit += 1;

            if (data.length / EACH_LEN < 1) {
              $state.complete();
            } 
          } else {
            $state.complete();
          }
        }, 500);
      })
      .catch((err) => {
        console.error(err);
      })
    }
  },
  computed: {
    ...mapState(["userId"]),
  },
  components: {
    'profile': Profile,
    'card': Card,
    'infinite-loading': InfiniteLoading,
  },
  created() {
    this.loadData();
  },
};
</script>
