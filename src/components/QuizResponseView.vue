<template>
    <div class="quiz">
        <div class="quiz-container">
            <div class="quiz-header">
                <div class="question-title-box">
                    <p>{{ response.quiz.title }}</p>
                </div>
                <p class="question-description-box">Ответ записан.</p>
                <div class="actions-container">
                    <router-link class="btn"
                                 target="_blank"
                                 :to="{ name: 'Response', params: { id: response.id } }">Посмотреть баллы</router-link>
                    <p class="link-container"><router-link class="link" :to="{ name: 'Quiz', params: { id: response.quiz.id } }">Отправить ещё один ответ</router-link></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters('response', ['response'])
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

.question-description-box {
    font-size: 14px;
    font-weight: 400;
    display: flex;
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

.btn {
    background: #673ab7;
    color: #fff;
    padding: 10px 25px;
    border-radius: 4px;
    outline: none;
    font-size: 16px;
    cursor: pointer;
    border: none;
    transition: all .15s;
    margin-bottom: 20px;
    text-decoration: none;
}

.link-container {
    margin-top: 15px;
}

.link {
    font-size: 14px;
}

.btn:hover {
    background: #7349bb;
}

.btn:active {
    opacity: 0.4;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}

.actions-container {
    margin-top: 40px;
}

</style>