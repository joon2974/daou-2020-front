<template>
  <v-row>
    <v-col cols="2"> </v-col>
    <v-col cols="8">
      <v-card>
        <v-row class="px-1">
          <v-col cols="6">
            <v-img
              class="white--text align-end"
              height="200px"
              src="../assets/algorithm.png"
            >
              <!-- <v-card-title class="purple--text">Allyeodaou</v-card-title> -->
            </v-img>

            <v-card-subtitle class="pb-0 purple--text font-weight-medium"
              >AlyeoDaou</v-card-subtitle
            >

            <v-card-text class="text--primary">
              <div>Write your own algorithm solutions</div>

              <div>And share it for others!</div>
            </v-card-text>
          </v-col>
          <v-col cols="6">
            <v-tabs
              v-model="tab"
              show-arrows
              background-color="#2484c6"
              icons-and-text
              dark
              grow
            >
              <v-tabs-slider color="black darken-4"></v-tabs-slider>
              <v-tab v-for="i in tabs" :key="i.name">
                <v-icon large>{{ i.icon }}</v-icon>
                <div class="caption py-1">{{ i.name }}</div>
              </v-tab>
              <v-tab-item>
                <sign-in></sign-in>
              </v-tab-item>
              <v-tab-item>
                <sign-up @changeTab="chgTab"></sign-up>
              </v-tab-item>
            </v-tabs>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="2"></v-col>
  </v-row>
</template>

<script>
import SignIn from "../components/SignInComponents/SignIn";
import SignUp from "../components/SignInComponents/SignUp";

export default {
  components: {
    "sign-in": SignIn,
    "sign-up": SignUp,
  },
  data() {
    return {
      tab: null,
      tabs: [
        { name: "Login", icon: "mdi-account" },
        { name: "Register", icon: "mdi-account-outline" },
      ],
    };
  },
  methods: {
    chgTab(tabNumber) {
      this.tab = tabNumber;
    },
  },
};
</script>
