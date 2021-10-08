<template>
    <div class="list-quiz">
        <PersonalQuizItem v-for="quiz in quizzes" :key="quiz.id" :quiz="quiz" />
    </div>
</template>

<script>
import PersonalQuizItem from './PersonalQuizItem.vue';
export default {
    props: ['quizzes'],
    components: { PersonalQuizItem }
}
</script>


<style scoped>
.list-quiz {
    display: flex;
    flex-wrap: wrap;
}
</style>