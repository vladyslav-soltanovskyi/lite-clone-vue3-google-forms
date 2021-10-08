<template>
    <div class="list-quiz">
        <QuizItem v-for="quiz in quizzes" :key="quiz.id"  :quiz="quiz" />
    </div>
</template>

<script>
import QuizItem from './QuizItem.vue';
export default {
    props: ['quizzes'],
    components: { QuizItem }
}
</script>


<style scoped>
.list-quiz {
    display: flex;
    flex-wrap: wrap;
}
</style>