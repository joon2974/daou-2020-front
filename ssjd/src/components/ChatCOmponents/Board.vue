<template>
  <v-form>
    <v-simple-table>
      <template slot="default">
        <tbody>
          <tr>
            <td>사이트</td>
            <td>
              <v-combobox
                v-model="board.select"
                :items="items"
                label="PlatForm"
                readonly
              ></v-combobox>
            </td>
          </tr>
          <tr>
            <td>언어</td>
            <td>{{ board.language }}</td>
          </tr>
          <tr>
            <td>제목</td>
            <td>{{ board.title }}</td>
          </tr>
          <tr>
            <td>문제</td>
            <td>{{ board.probId }} - {{ board.problem }}</td>
          </tr>
          <tr>
            <td>글쓴이</td>
            <td>{{ board.userId }}</td>
          </tr>
          <tr>
            <td>풀이</td>
            <td>
              <v-textarea
                class="my-3"
                :value="board.content"
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
  </v-form>
</template>

<script>
export default {
  props: {
    board: {
      postId: Number,
      userId: Number,
      probId: Number,
      problem: String,
      language: String,
      title: String,
      content: String,
      select: String,
    },
  },

  components: {},

  data() {
    return {
      // select: "",
      items: ["BOJ", "Prog", "etc"],
    };
  },
};
</script>
