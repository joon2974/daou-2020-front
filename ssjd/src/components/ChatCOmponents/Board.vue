<template>
  <v-form>
    <v-simple-table>
      <template slot="default">
        <tbody>
          <tr>
            <td>사이트</td>
            <td>{{ post.problem.problemType }}</td>
            <!-- <td>
              <v-combobox
                :v-model="post.problem.problemType"
                :items="items"
                label="PlatForm"
                readonly
              ></v-combobox>
            </td> -->
          </tr>
          <tr>
            <td>언어</td>
            <td>{{ post.language }}</td>
          </tr>
          <tr>
            <td>제목</td>
            <td>{{ post.title }}</td>
          </tr>
          <tr>
            <td>문제</td>
            <td>
              {{ post.problem.problemId }} - {{ post.problem.problemTitle }}
            </td>
          </tr>
          <tr>
            <td>글쓴이</td>
            <td>{{ post.user.userId }}</td>
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
  </v-form>
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
