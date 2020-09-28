<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <template v-for="n in 6">
        <v-col :key="n">
          <v-card
            class="pa-15"
            outlined
            tile
          >
            <post-card/>
          </v-card>
        </v-col>
        <v-responsive
          v-if="n % 2 === 0"
          :key="`width-${n}`"
          width="100%"
        ></v-responsive>
      </template>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
import Card from "../components/Card";
const headers = {
  "Content-type": "application/json; charset=UTF-8",
  Accept: "*/*",
  "Access-Control-Allow-Origin": "*",
};

export default {
    data(){
        return{
            nickname: "nickname",
            title: "title",
            platform: "programmers",
            problemTitle: "H-Index"
        }
    },
    components: {
        "post-card" : Card
    },
    created: function(){
            const pageNum = 0;
            axios
                .get(`http://localhost:3000/api/posts?pageNum=${pageNum}`, headers)
                .then((data) => {
                console.log(data)
            })
        }
};
</script>
