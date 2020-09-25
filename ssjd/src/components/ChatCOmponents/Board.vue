<template>
  <v-form>
    <v-label>~ 게시글 조회 ~</v-label>
    <v-simple-table>
      <template slot="default">
        <tbody>
          <tr>
            <td>PlatForm</td>
            <td>
              <v-combobox
                v-model="select"
                :items="items"
                label="PlatForm"
              ></v-combobox>
            </td>
          </tr>
          <tr>
            <td>Language</td>
            <td>Java</td>
          </tr>
          <tr>
            <td>Title</td>
            <td>Comparator, CompareTo 사용한 풀이[JAVA]</td>
          </tr>
          <tr>
            <td>Problem No.</td>
            <td>2263</td>
          </tr>
          <tr>
            <td>Writer</td>
            <td>user1</td>
          </tr>
          <tr>
            <td>Content</td>
            <td>
              <v-textarea
                class="mt-3"
                dense
                rows="1"
                readonly
                auto-grow
                outlined
                value="입력으로 주어지는 어쩌고저쩌고"
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
    postId: Number,
    userId: Number,
    probId: Number,
    problem: Number,
    language: String,
    title: String,
    content: String,

    platForm,
    probNum,
    writer,
  },

  components: {},

  data() {
    return {
      select: "",
      items: ["BOJ", "Prog", "etc"],
    };
  },
};
</script>
