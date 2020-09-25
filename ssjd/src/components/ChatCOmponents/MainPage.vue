<template>
  <v-content>
    <v-container fluid>
      <v-layout align-center justify-center>
        <v-row>
          <v-col cols="12" sm="4">
            <v-flex>
              <v-card>
                <board></board>
              </v-card>
            </v-flex>
          </v-col>
          <v-col cols="12" sm="4">
            <v-flex>
              <v-card>
                <codeView :codeOverall="content"></codeView>
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
                    <chat-message
                      v-for="msg in messages"
                      :key="msg.tmpMsgId"
                      :msgId="msg.tmpMsgId"
                      :userId="msg.tmpUserId"
                      :postId="msg.tmpPostId"
                      :content="msg.tmpContent"
                      :createdDate="new Date()"
                    >
                    </chat-message>
                  </v-list>
                </v-card-text>
                <v-divider></v-divider>
                <!-- enter message -->
                <v-card-actions>
                  <chat class="pa-3"></chat>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-col>
        </v-row>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import Board from "./Board";
import CodeView from "./Code";
import Chat from "./Chat";
import ChatMessage from "./ChatMessage";

export default {
  components: {
    board: Board,
    codeView: CodeView,
    chat: Chat,
    "chat-message": ChatMessage,
  },

  data() {
    return {
      content:
        'public class Solution{\n\tpublic static void main(String[] args){\n\t\tSystem.out.println("코드 리뷰 좀");\n\t}\n}',
      messages: [
        {
          tmpMsgId: 1,
          tmpUserId: 1,
          tmpPostId: 1,
          tmpContent: "Test 제발 돼라",
          tmpCreateDate: new Date(),
        },
        {
          tmpMmsgId: 2,
          tmpUserId: 2,
          tmpPostId: 2,
          tmpContent: "ㅎㅇㄹ",
          tmpCreateDate: new Date(),
        },
        {
          tmpMmsgId: 3,
          tmpUserId: 3,
          tmpPostId: 3,
          tmpContent: "공부해라",
          tmpCreateDate: new Date(),
        },
      ],
    };
  },
};
</script>
S
