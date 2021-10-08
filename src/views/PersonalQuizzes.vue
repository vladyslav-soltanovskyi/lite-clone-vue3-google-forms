<template>
    <div class="personal-quiz-list">
        <div class="section-personal-quiz-list" :class="{ start: start }" @click="resizeList">
            <div class="container">
                <div class="header-title">Мои викторины</div>
                <template v-if="quizzes.length">
                    <PersonalQuizList :quizzes="quizzes" />
                </template>
                <template v-else>
                    Вы еще не создали не одну викторину
                </template>
            </div>
        </div>
        <BtnAddQuiz />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PersonalQuizList from '@/components/PersonalQuizList.vue';
import BtnAddQuiz from '@/components/BtnAddQuiz.vue';

export default {
    data: () => ({ start: false }),
    computed: {
        ...mapGetters('quizzes', ['quizzes'])
    },
    components: { PersonalQuizList, BtnAddQuiz }
}
</script>


<style scoped>
.container {
    max-width: 1100px;
    margin: 0 auto;
}

@media only screen and (max-width: 1145px) {
    .container {
        max-width: 890px;
    }
}

@media only screen and (max-width: 925px) {
    .container {
        max-width: 670px;
    }
}

@media only screen and (max-width: 705px) {
    .container {
        max-width: 440px;
    }
}

@media only screen and (max-width: 450px) {
    .container {
        max-width: 230px;
    }
}

.section-personal-quiz-list {
    padding-bottom: 20px;
}

.header-title {
    font-weight: 600;
    color: #202124;
    font-size: 16px;
    line-height: 24px;
    margin-left: 15px;
    margin-right: 30px;
    padding-top: 21px;
    padding-right: 0;
    padding-bottom: 19px;
}
</style>