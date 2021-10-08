<template>
    <div class="quiz">
        <div class="quiz-container">
            <div class="quiz-header">
                <div class="question-title-box">
                    <p>{{ response.quiz.title }}</p>
                    <div class="quiz-grade-header-container">
                        <span class="quiz-grade-title">Всего</span>
                        <span class="quiz-grade">
                            {{response.score}}/{{response.totalScore}}
                        </span>
                    <CircleStatusResponse :score="response.score" :totalScore="response.totalScore" />
                    </div>
                </div>
                <p class="question-description-box">{{ response.quiz.description }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import CircleStatusResponse from './CircleStatusResponse.vue';
export default {
    props: ['response'],
    components: {
        CircleStatusResponse
    }
}
</script>


<style scoped>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

.quiz {
    max-width: 700px;
    position: relative;
    padding-top: 10px;
    margin: 0 auto;
}

.question-title-box {
    display: flex;
    margin: 5px 0;
    justify-content: space-between;
}

.question-title-box p {
    font-size: 32px;
    font-weight: 400;
}

.quiz-grade-header-container {
    font-size: 14px;
    display: flex;
    align-items: center;
}

.quiz-grade {
    background-color: rgb(103, 58, 183);
    color: rgba(255, 255, 255, 1);
    padding: 8px 4px;
    border-radius: 3px;
}

.quiz-grade-title {
    margin-right: 10px;
}

.question-description-box {
    font-size: 14px;
    font-weight: 400;
    display: flex;
}


.block-actions {
    margin-top: 30px;
    padding-top: 15px;
    border-top: 1px solid #dadce0;
    display: flex;
    justify-content: space-between;
}


.quiz-container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px 2px rgba(100, 100, 100, 0.1);
    /* overflow: hidden; */
    margin-top: 20px;
    border-top: 10px solid rgb(103, 58, 183);
    padding-left: 7px;
}

.quiz-header {
    padding: 2rem;
}
</style>