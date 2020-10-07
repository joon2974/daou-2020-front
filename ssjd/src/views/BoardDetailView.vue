<template>
  <!-- 리팩토링 plz.... -->
  <v-content>
    <v-container fluid>
      <v-layout row wrap>
        <v-row>
          <v-col cols="12" sm="4">
            <v-card>
              <v-card-text>
                <v-label>게시글 보기</v-label>
                <board :post="boardInfo"></board>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="4">
            <v-card>
              <v-card-text>
                <v-label>코드 보기</v-label>
                <codeView
                  :codeOverall="boardInfo.code"
                  :select="boardInfo.language"
                ></codeView>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="4">
            <v-card>
              <!-- received message -->
              <v-card-text>
                <v-label>채팅 목록</v-label>
                <v-list class="elevation-1 pa-5">
                  <message-list
                    :messages="messages"
                    :connected="connected"
                    @re-connect="reConnect"
                  >
                  </message-list>
                </v-list>
              </v-card-text>

              <v-divider></v-divider>

              <!-- enter message -->
              <my-chat
                class="pa-5"
                @send-message="sendMessage"
                :connected="connected"
              ></my-chat>
            </v-card>
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
    axios
      .get(`${serverPath}/posts/${postId}`, headers)
      .then((res) => {
        this.boardInfo = res.data;
        console.log(this.boardInfo);
      })
      .catch((res) => {
        alert("잘못된 게시글 정보입니다.");
        console.log(res);
      });

    axios.get(`${serverPath}/chats/${postId}`, headers).then((res) => {
      this.messages = res.data;
      console.log(this.messages);
    });

    this.connect();
  },

  computed: {
    ...mapState(["userId", "nickName"]),
  },

  methods: {
    connect() {
      let postId = this.postId;
      let socket = new SockJS(socketEndPoint);
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect(
        {}, //headers
        (frame) => {
          this.connected = true;
          console.log("socket connection success!", frame);
          this.stompClient.subscribe(`/sub/join/${postId}`, (res) => {
            console.log(res.body); //userId만 찍힌다
            // this.messages.push({});
          });

          this.stompClient.subscribe(`/sub/receive/${postId}`, (res) => {
            this.messages.push(JSON.parse(res.body));
          });

          if (this.stompClient && this.stompClient.connected) {
            this.stompClient.send(
              `/api/chats/join/${postId}`,
              JSON.stringify({ userId: this.userId, content: "" }),
              {}
            );
          }
        }, //conn
        (error) => {
          this.connected = false;
          console.log("socket connection fail...", error);
        } //fail
      );
    },

    sendMessage(message) {
      let postId = this.postId;
      if (this.stompClient && this.stompClient.connected) {
        const msg = {
          userId: this.userId,
          content: message,
        };
        this.stompClient.send(`/api/chats/${postId}`, JSON.stringify(msg), {});
      }
    },

    //위의 connect 코드를 쓰고 싶다..
    reConnect() {
      let postId = this.postId;
      let socket = new SockJS(socketEndPoint);
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect(
        {}, //headers
        (frame) => {
          this.connected = true;
          console.log("socket connection success!", frame);
          this.stompClient.subscribe(`/sub/receive/${postId}`, (res) => {
            this.messages.push(JSON.parse(res.body));
          });
        }, //conn
        (error) => {
          this.connected = false;
          console.log("socket connection fail...", error);
        } //fail
      );
    },
  },

  data() {
    return {
      connected: "", //소켓 연결 상태

      postId: this.$route.params.postId, //게시글 번호

      boardInfo: {}, //게시글 정보

      messages: [], //게시글에 따른 메시지 정보
    };
  },
};
</script>
