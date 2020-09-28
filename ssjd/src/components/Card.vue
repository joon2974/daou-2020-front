<template>
<div>
    <h1>{{this.nickname}}</h1>
    <h1>{{this.title}}</h1>
    <h1>{{this.platform}}</h1>
    <h1>{{this.problemTitle}}</h1>
    </div>
</template>
<script>
export default {
    data() {
        return {
            nickname: "사용자명",
            title: "글 제목",
            platform: "프로그래머스",
            problemTitle: "H-Index"
        }
    }
};
</script>
