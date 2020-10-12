<template>
  <v-content>
    <v-row>
      <v-col cols="12" sm="4">
        <board :post="boardInfo"></board>
      </v-col>

      <v-col cols="12" sm="4">
        <codeView
          :codeOverall="boardInfo.code"
          :select="boardInfo.language"
        ></codeView>
      </v-col>

      <v-col cols="12" sm="4">
        <chatView
          :messages="messages"
          :connected="connected"
          @send-message="sendMessage"
          @re-connect="reConnect"
        >
        </chatView>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
import Board from "@/components/ChatComponents/Board";
import CodeView from "@/components/ChatComponents/Code";
import ChatView from "@/components/ChatComponents/ChatView";

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
    chatView: ChatView,
  },

  created() {
    let postId = this.postId;

    //게시글 정보 가져오기
    axios
      .get(`${serverPath}/posts/${postId}`, headers)
      .then((res) => {
        this.boardInfo = res.data;
      })
      .catch((res) => {
        alert("잘못된 게시글 정보입니다.");
        console.log(res);
      });

      //메시지 목록 불러오기
    axios.get(`${serverPath}/chats/${postId}`, headers).then((res) => {
      console.log("getMsg : ");
      console.log(res);
      this.messages = res.data;
    });

    //소켓 연결
    this.connect(postId, false);
  },

  computed: {
    ...mapState(["userId", "nickName"]),
  },

  methods: {
    connect(postId, reconnect) {
      let socket = new SockJS(socketEndPoint);
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect(
        {}, //headers
        () => {
          this.connected = true;

          this.stompClient.subscribe(`/sub/receive/${postId}`, (res) => {
            console.log(JSON.parse(res.body));
            this.messages = [...this.messages, JSON.parse(res.body)];
          });

          if(reconnect === false){
            //join 알리기
            if (this.stompClient && this.stompClient.connected) {
              this.stompClient.send(
                `/pub/chats/${postId}`,
                JSON.stringify({
                  userId: this.userId,
                  content: "",
                  messageType: "JOIN",
                }),
                {}
              );
            }
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
          messageType: "SEND",
        };
        //STOMP 메시지는 string (json->string)
        this.stompClient.send(`/pub/chats/${postId}`, JSON.stringify(msg), {});
      }
    },

    reConnect() {
      this.connect(this.postId, true);
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
