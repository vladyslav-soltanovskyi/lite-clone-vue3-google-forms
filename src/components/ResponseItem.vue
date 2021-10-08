<template>
    <div class="response">
        <div class="index" @click="redirectToResponse">{{ index + 1 }}</div>
        <div class="user-avatar" @click="redirectToResponse"><Avatar :user="response.user"/></div>
        <div class="name" @click="redirectToResponse">{{ response.user.username }}</div>
        <div class="score">{{ response.score }} / {{ response.totalScore }}</div>
        <CircleStatusResponse :score="response.score" :totalScore="response.totalScore" />
    </div>
</template>

<script>
import Avatar from './Avatar.vue';
import CircleStatusResponse from './CircleStatusResponse.vue';
export default {
   props: ['response', 'index'],
   computed: {
       showResultInColor() {
           let scoreOfPercent = +(this.response.score / this.response.totalScore).toFixed(2) * 100;
           if (scoreOfPercent < 30) {
               return 'red';
           }
           else if (scoreOfPercent < 50) {
               return 'orange'
           }
           else if (scoreOfPercent < 70) {
               return 'yellow';
           }
           else if (scoreOfPercent < 90) {
               return 'green';
           }
           return 'purple';
       }
   },
   methods: {
       redirectToResponse() {
           this.$router.push(`/response/${this.response.id}`);
       }
   },
   components: {
       Avatar, CircleStatusResponse
   }
}
</script>

<style scoped>
.response {
    display: flex;
    align-items: center;
    padding: 5px;
}

.response:not(:last-child) {
    border-bottom: 1px solid #dadce0;
}

.index {
    cursor: pointer;
    color: rgb(155, 155, 155);
    font-size: 14px;
    padding-right: 20px;
}

.user-avatar {
    cursor: pointer;
    width: 35px;
    height: 35px;
    padding-right: 15px;
}

.name {
    cursor: pointer;
    flex-grow: 1;
}
</style>