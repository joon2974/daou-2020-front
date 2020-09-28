<template>
  <v-content>
    <v-container fluid>
      <v-layout align-center justify-center>
        <v-row>
          <v-col cols="12" sm="4">
            <v-flex>
              <v-card>
                <board
                  :postId="boardInfo.postId"
                  :userId="boardInfo.userId"
                  :probId="boardInfo.probId"
                  :problem="boardInfo.problem"
                  :language="boardInfo.language"
                  :title="boardInfo.title"
                  :content="boardInfo.content"
                  :select="boardInfo.select"
                ></board>
              </v-card>
            </v-flex>
          </v-col>
          <v-col cols="12" sm="4">
            <v-flex>
              <v-card>
                <codeView
                  :codeOverall="codeInfo.content"
                  :select="codeInfo.select"
                ></codeView>
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
                      :msgId="msg.msgId"
                      :userId="msg.userId"
                      :postId="msg.postId"
                      :nickName="msg.nickName"
                      :content="msg.content"
                      :createdDate="new Date()"
                    >
                    </message-list>
                  </v-list>
                </v-card-text>

                <v-divider></v-divider>

                <!-- enter message -->
                <my-chat class="pa-5"></my-chat>
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
import Chat from "../components/ChatComponents/Chat";

export default {
  components: {
    board: Board,
    codeView: CodeView,
    "my-chat": SendChat,
    "message-list": Chat,
  },

  data() {
    return {
      codeInfo: {
        content:
          'public class Solution{\n\tpublic static void main(String[] args){\n\t\tSystem.out.println("코드 리뷰 좀");\n\t}\n}',
        select: "Java",
      },

      messages: [
        {
          msgId: 1,
          userId: 1,
          postId: 1,
          nickName: "닉1",
          content: "Test 제발 돼라",
          createDate: new Date(),
        },
        {
          msgId: 2,
          userId: 2,
          postId: 1,
          nickName: "닉2",
          content: "ㅎㅇㄹ",
          createDate: new Date(),
        },
        {
          msgId: 3,
          userId: 3,
          postId: 1,
          nickName: "닉3",
          content: "공부해라",
          createDate: new Date(),
        },
      ],
      boardInfo: {
        postId: 1,
        userId: 10000,
        probId: 2263,
        problem: "트리의 순회",
        language: "Java",
        title: "Comparator, CompareTo 사용한 풀이[JAVA]",
        content: "입력으로 주어지는 어쩌고저쩌고",
        select: "BOJ",
      },
    };
  },
};
</script>
