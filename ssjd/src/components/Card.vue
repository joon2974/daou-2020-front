<template>
<v-card>
    <h2>nickname : {{post.user.nickname}}</h2>
    <h4>Title : {{post.title}}</h4>
    <h4>Site : {{post.problem.problemLink}}</h4>
    <h4>Problem : {{post.problem.problemTitle}}</h4>
    </v-card>
</template>
<script>
export default {
    props: ['post'],
};
</script>
