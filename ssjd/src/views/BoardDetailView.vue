<template>
  <v-content>
    <v-container fluid>
      <v-layout>
        <v-row>
          <v-col cols="12" sm="4">
            <v-flex>
              <v-card>
                <v-card-text>
                  <v-label>게시글 보기</v-label>
                  <board :post="boardInfo"></board>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-col>

          <v-col cols="12" sm="4">
            <v-flex>
              <v-card>
                <v-card-text>
                  <v-label>코드 보기</v-label>
                  <codeView
                    :codeOverall="boardInfo.code"
                    :select="boardInfo.language"
                  ></codeView>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-col>

          <v-col cols="12" sm="4">
            <v-flex>
              <v-card>
                <!-- received message -->
                <v-card-text>
                  <v-label>채팅 목록</v-label>
                  <v-list class="elevation-1 pa-5">
                    <message-list :messages="boardInfo.messages">
                    </message-list>
                  </v-list>
                </v-card-text>

                <v-divider></v-divider>

                <!-- enter message -->
                <my-chat class="pa-5" @send-message="sendMessage"></my-chat>
              </v-card>
            </v-flex>
          </v-col>
        </v-row>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import Board from "../components/ChatComponents/Board";
import CodeView from "../components/ChatComponents/Code";
import SendChat from "../components/ChatComponents/SendChat";
import Chat from "../components/ChatComponents/ChatList";

import Stomp from "webstomp-client";
import SockJS from "sockjs-client";
import axios from "axios";
import { mapState } from "vuex";

const headers = {
  "Content-type": "application/json; charset=UTF-8",
  Accept: "*/*",
  "Access-Control-Allow-Origin": "*",
};

const serverPath = "http://localhost:3000/api";
const socketEndPoint = "http://localhost:3000/ws";

export default {
  components: {
    board: Board,
    codeView: CodeView,
    "my-chat": SendChat,
    "message-list": Chat,
  },

  created() {
    let postId = this.postId;
    axios.get(`${serverPath}/posts/${postId}`, headers).then((res) => {
      this.boardInfo = res.data;
      console.log(this.boardInfo);
    });

    let socket = new SockJS(socketEndPoint);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect(
      {}, //headers
      (frame) => {
        this.connect = true;
        console.log("socket connection success!", frame);
        this.stompClient.subscribe(`/sub/receive/${postId}`, (res) => {
          console.log("message by sub", res.body);
          this.boardInfo.messages.push(JSON.parse(res.body));
        });
      }, //conn
      (error) => {
        this.connected = false;
        console.log("socket connection fail...", error);
      } //fail
    );
  },

  computed: {
    ...mapState(["userId", "nickname"]),
  },

  methods: {
    sendMessage(message) {
      let postId = this.postId;
      if (this.stompClient && this.stompClient.connected) {
        const msg = {
          userId: 1,
          //userId: this.userId;
          content: message,
        };
        this.stompClient.send(`/chat/send/${postId}`, JSON.stringify(msg), {});
      }
    },
  },

  data() {
    return {
      postId: this.$route.params.postId,

      boardInfo: {},
    };
  },
};
</script>
