<template>
  <v-card>
    <v-card-text>
      <v-label>게시글 보기</v-label>
      <v-simple-table outline>
        <template slot="default">
          <tbody>
            <tr>
              <td>사이트</td>
              <td v-if="post.problem">{{ post.problem.problemSite }}</td>
            </tr>
            <tr>
              <td>언어</td>
              <td>{{ post.language }}</td>
            </tr>
            <tr>
              <td>제목</td>
              <td>{{ post.title }}</td>
            </tr>
            <tr class="my-2">
              <td>문제</td>
              <td v-if="post.problem">
                {{ post.problem.problemTitle }}
                <br />
                <!-- url 유효성 검사 필요 -->
                <a target="_blank" :href="post.problem.problemLink">{{
                  post.problem.problemLink
                }}</a>
              </td>
            </tr>
            <tr>
              <td>글쓴이</td>
              <td v-if="post.user">{{ post.user.nickname }}</td>
            </tr>
            <tr>
              <td>풀이</td>
              <td>
                <v-textarea
                  class="my-3"
                  :value="post.content"
                  dense
                  rows="1"
                  readonly
                  auto-grow
                  outlined
                  hide-details
                >
                </v-textarea>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["post"],

  components: {},

  data() {
    return {
      items: ["백준", "Prog", "etc"],
    };
  },
};
</script>
