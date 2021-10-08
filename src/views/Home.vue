<template>
    <div class="home">
        <div class="section-quiz-list">
            <div class="container">
                <div class="header-title">Все викторины</div>
                <template v-if="quizzesAll.length">
                    <QuizList :quizzes="quizzesAll" />
                </template>
                <template v-else>
                    В данный момент не существует викторин 
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import QuizList from '@/components/QuizList.vue';

export default {
    data: () => ({ start: false }),
    computed: {
        ...mapGetters('quizzes', ['quizzesAll'])
    },
    components: { QuizList }
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