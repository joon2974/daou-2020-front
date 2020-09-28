<template>
  <v-form>
    <v-simple-table>
      <template slot="default">
        <tbody>
          <tr>
            <td>사이트</td>
            <td>
              <v-combobox
                v-model="select"
                :items="items"
                label="PlatForm"
                readonly
              ></v-combobox>
            </td>
          </tr>
          <tr>
            <td>언어</td>
            <td>{{ language }}</td>
          </tr>
          <tr>
            <td>제목</td>
            <td>{{ title }}</td>
          </tr>
          <tr>
            <td>문제</td>
            <td>{{ probId }} - {{ problem }}</td>
          </tr>
          <tr>
            <td>글쓴이</td>
            <td>{{ userId }}</td>
          </tr>
          <tr>
            <td>풀이</td>
            <td>
              <v-textarea
                class="my-3"
                :value="content"
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
    postId: Number,
    userId: Number,
    probId: Number,
    problem: String,
    language: String,
    title: String,
    content: String,
    select: String,
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
