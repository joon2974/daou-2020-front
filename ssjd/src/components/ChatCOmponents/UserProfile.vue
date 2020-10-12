<template>
  <v-list-item-action class="justify-center">
    <v-avatar class="mb-1 align-self-center" color="primary">
      <v-icon dark>
        mdi-account-circle
      </v-icon>
    </v-avatar>
    <label class="align-self-center">{{ nickname }}</label>
  </v-list-item-action>
</template>

<script>
export default {
  props: ["nickname"],
};
</script>

<style></style>
