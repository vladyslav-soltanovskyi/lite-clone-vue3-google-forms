<template>
    <div class="quiz-item" @click="redirectToQuiz">
        <div class="quiz-header-thumb">
            <img :src="quiz.image ? quiz.image : 'https://picsum.photos/400'" alt="quiz">
        </div>

        <div class="quiz-item-content">

            <div class="quiz-item-main">
                <div class="quiz-item-info">
                    <span class="quiz-title">{{ quiz.title }}</span>
                    <p class="quiz-date">{{ convertDate(quiz.updated_at) }}</p>
                    <!-- 15 сент. 2021 г. -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ['quiz'],
    methods: {
        convertDate(date) {
            let d = new Date(date);
            let year = d.getFullYear();
            let month = d.getMonth() + 1;
            let day = d.getDate();
            let str = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
            return str;
        },
        redirectToQuiz() {
            this.$router.push(`/quiz/${this.quiz.id}`);
        }
    }
}
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

.quiz-item {
    max-width: 200px;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #e6ecf5;
    margin: 0 10px 15px 10px;
    cursor: pointer;
}

.quiz-item:hover {
    border: 1px solid #673ab7;
}

.quiz-header-thumb {
    border-bottom: 1px solid #d3d7df;
    overflow: hidden;
    height: 170px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.quiz-header-thumb img {
    width: 100%;
    display: block;
    height: auto;
}

.quiz-item-content {
    position: relative;
}

.quiz-title {
    text-decoration: none;
    margin-bottom: .5rem;
    font-weight: 700;
    line-height: 1.3;
    color: #414549;
    font-size: 14px;
    transition: 0.15s all;
}

.quiz-date {
    font-size: .812rem;
    font-weight: 400;
    line-height: 1.5;
    color: #8d91ab;
}

.quiz-item-main {
    padding: 16px 8px 14px 16px;
}
</style>