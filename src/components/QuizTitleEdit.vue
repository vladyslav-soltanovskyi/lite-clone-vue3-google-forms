<template>
    <div class="quiz">
        <div class="quiz-container" :class="{ active: isActive }">
            <template v-if="isActive">
                <div class="quiz-header">
                    <div class="question-title-box">
                        <FormInput @changeTitle="changeTitleQuiz($event)" :id="quiz.id" :value="quiz.title" :size="30" />
                    </div>
                    <div class="question-description-box">
                        <FormInput @changeTitle="changeDescriptionQuiz($event)" :id="quiz.id" :value="quiz.description" :size="14" />
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="quiz-header" @click="showVisibility">
                    <p class="question-title-box">{{ quiz.title }}</p>
                    <p class="question-description-box">{{ quiz.description }}</p>
                </div>
            </template>
        </div>
    <AdditionalOptions />
    </div>
</template>

<script>
import FormInput from './FormInput.vue';
import AdditionalOptions from './AdditionalOptions.vue';
import { mapGetters } from 'vuex';
export default {
    data: () => ({
        id: 0
    }),
    computed: {
        isActive() {
            return this.id === this.currentBlock;
        },
        ...mapGetters('currentBlock', ['currentBlock']),
        ...mapGetters('quiz', ['quiz'])
    },
    methods: {
        changeTitleQuiz({ id, value }) {
            let quiz = { id, title: value };
            this.$store.dispatch('quiz/edit', quiz);
        },
        changeDescriptionQuiz({ id, value }) {
            let quiz = { id, description: value };
            this.$store.dispatch('quiz/edit', quiz);
        },
        showVisibility() {
            this.$store.commit('currentBlock/setIdBlock', this.id);
        },
    },
    components: {
        FormInput, AdditionalOptions
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
    padding-top: 40px;
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

.quiz-container.active {
    border-left: 7px solid #4285f4;
    padding-left: 0;
}

.quiz-header {
    padding: 2rem;
}


</style>