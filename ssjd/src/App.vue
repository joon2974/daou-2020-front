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
            <v-col cols="6"><v-img src="./assets/daou_logo.png"/></v-col>
            <v-col cols="6" class="my-4 font-weight-bold"
              ><span v-text="title"
            /></v-col>
          </v-row>
        </v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon v-if="isAuthenticated" @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-btn icon v-else @click="login">
        <span>로그인</span>
      </v-btn>
    </v-app-bar>

    <v-main id="inspire">
      <v-parallax
        height="100%"
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
import axios from "axios";
// import jwt from "jsonwebtoken";
// import { jwtSalt } from "../secretStrings";

export default {
  data() {
    return {
      isAuthenticated: false,
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
          to: "/",
        },
        {
          icon: "mdi-briefcase-outline",
          title: "백준",
          to: "/BJ",
        },
        {
          icon: "mdi-chat",
          title: "프로그래머스",
          to: "/board",
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
      const token = this.accessToken;
      // jwt 복호화 참고
      // console.log(`솔트: ${jwtSalt.salt}`);
      // try {
      //   const decoded = jwt.verify(token, jwtSalt.salt);
      //   console.log(decoded);
      // } catch (e) {
      //   console.log(e);
      // }
      this.isAuthenticated = token === undefined ? false : true;
      if (this.isAuthenticated) {
        axios.defaults.headers.common["Authorization"] = `${this.accessToken}`;
      } else this.$router.push("/signin");
    },
    logout() {
      this.$store.dispatch("LOGOUT").then(() => {
        if (this.$route.path === "/") window.location.reload();
        else this.$router.push("/");
      });
    },
    login() {
      if (this.$route.path !== "/signin") this.$router.push("/signin");
    },
  },
  created() {
    this.loginChk();
    console.log(`로그인 여부: ${this.isAuthenticated}`);
  },
  updated() {
    const token = this.accessToken;
    this.isAuthenticated = token === undefined ? false : true;
  },
  computed: {
    ...mapState(["userId", "nickName", "accessToken"]),
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

<style scoped>
#inspire img {
  height: 100%;
}
</style>
