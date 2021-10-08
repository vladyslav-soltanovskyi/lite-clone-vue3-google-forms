<template>
    <div class="quiz">
        <div class="quiz-container">
            <div class="quiz-header" @click="showVisibility">
                <p class="question-title-box">{{ quiz.title }}</p>
                <p class="question-description-box">{{ quiz.description }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters('quiz', ['quiz'])
    },
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
    font-size: 32px;
    font-weight: 400;
    display: flex;
    margin: 5px 0;
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