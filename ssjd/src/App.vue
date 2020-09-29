<template>
  <v-app light>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn depressed="depressed" @click="goToHome">
        <v-toolbar-title>
          <v-row>
            <v-col cols="6"><v-img src="./assets/daou_logo.png" /></v-col>
            <v-col cols="6" class="my-4 font-weight-bold"
              ><span v-text="title"
            /></v-col>
          </v-row>
        </v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-parallax
        :height="parallaxHeight"
        src="./assets/tmp-bg.jpg"
        @click.stop="closeMenu"
      >
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-parallax>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      depressed: true,
      items: [
        {
          icon: "mdi-clipboard-text-outline",
          title: "나의 풀이",
          to: "/mypage",
        },
        {
          icon: "mdi-clipboard-text-outline",
          title: "게시판",
          to: "/board",
        },
        {
          icon: "mdi-briefcase-outline",
          title: "백준",
          to: "/signin",
        },
        {
          icon: "mdi-chat",
          title: "프로그래머스",
          to: "/NotFound",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "SSJD",
    };
  },
  methods: {
    closeMenu() {
      this.drawer = false;
    },
    goToHome() {
      this.$router.push("/");
    },
    loginChk() {
      if (this.userId) this.$router.push("/");
      else this.$router.push("/signin");
    },
    logout() {
      alert("로그아웃!");
      this.$store.dispatch("LOGOUT").then(() => this.$router.push("/"));
    },
  },
  mounted() {
    console.log(this.userId);
    this.loginChk();
  },
  computed: {
    ...mapState(["userId", "nickName"]),
    parallaxHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 200;
        case "sm":
          return 400;
        case "md":
          return 500;
        case "lg":
          return 700;
        case "xl":
          return 900;
        default:
          return 700;
      }
    },
  },
};
</script>
