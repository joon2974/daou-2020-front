<template>
  <v-content>
    <v-container fluid>
      <v-layout align-center justify-center class="overflow-y-auto">
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
                    <message-list
                      v-for="msg in messages"
                      :key="msg.msgId"
                      :message="msg"
                    >
                    </message-list>
                  </v-list>
                </v-card-text>

                <v-divider></v-divider>

                <!-- enter message -->
                <my-chat class="pa-5" :user="boardInfo.user"></my-chat>
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
import axios from "axios";

const path = "http://localhost:3000/api";
const headers = {
  "Content-type": "application/json; charset=UTF-8",
  Accept: "*/*",
  "Access-Control-Allow-Origin": "*",
};

export default {
  components: {
    board: Board,
    codeView: CodeView,
    "my-chat": SendChat,
    "message-list": Chat,
  },

  created() {
    const postId = this.postId;
    axios.get(`${path}/posts/${postId}`, headers).then((res) => {
      this.boardInfo = res.data;
      console.log(this.boardInfo.user);
    });
  },

  data() {
    return {
      postId: 1,

      boardInfo: {},

      //tmp
      messages: [
        {
          msgId: 1,
          userId: 1,
          postId: 1,
          nickName: "닉1",
          content: "Test 제발 돼라",
          createdDate: new Date(),
        },
        {
          msgId: 2,
          userId: 2,
          postId: 1,
          nickName: "닉2",
          content: "ㅎㅇㄹ",
          createdDate: new Date(),
        },
        {
          msgId: 3,
          userId: 3,
          postId: 1,
          nickName: "닉3",
          content: "공부해라",
          createdDate: new Date(),
        },
      ],
    };
  },
};
</script>
