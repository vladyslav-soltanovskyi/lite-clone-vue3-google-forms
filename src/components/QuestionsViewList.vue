<template>
    <div class="quiz">
        <div class="quiz-container" v-for="question in questions" :key="question.id">
            <div class="quiz-header">
                <div class="question-title-box edit-score">
                    <p class="question-title">{{ question.question }}</p>
                    <div class="block-counter">
                        <span class="score">{{ genitive(question.score) }}</span>
                    </div>
                </div>
                <template v-if="question.type === 'radio'">
                    <VariantListRadioView :question="question" />

                </template>
                <template v-if="question.type === 'checkbox'">
                    <VariantListCheckBoxView :question="question" />

                </template>
                <template v-if="question.type === 'input'">
                    <VariantListInputView :question="question" :isEdit="false" />

                </template>
            </div>
        </div>
        <button class="btn" @click="storeResponse" :disabled="isSending">Отправить</button>
    </div>
</template>

<script>
import VariantListRadioView from "./VariantListRadioView.vue";
import VariantListCheckBoxView from "./VariantListCheckBoxView.vue";
import VariantListInputView from "./VariantListInputView.vue";
import { mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters('questions', ['questions']),
        ...mapGetters('response', ['isSending'])
    },
    methods: {
        changeValueQuestion({id, value}) {
            this.$store.dispatch('questions/edit', {id, question: value});
        },
        genitive(n) {
            let word = {singular: 'балл', many1: 'балла', many2: 'баллов'};
            let res = word.many2;
            if (n % 100 < 5 || n % 100 > 20) {
                if (n % 10 == 1) {
                    res = word.singular;
                }
                if (n % 10 > 1 && n % 10 < 5) {
                    res = word.many1; 
                }
            }
            return `${n} ${res}`;
        },
        ...mapActions('response', {
            storeResponse: 'add'
        })
    },
    components: {
        VariantListRadioView,
        VariantListCheckBoxView,
        VariantListInputView
    }
}
</script>

<style scoped>
*:not(i) {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.quiz {
    max-width: 700px;
    position: relative;
    margin: 0 auto;
}

.question-title-box {
    margin-bottom: 5px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.question-title-box.edit-score {
    margin-bottom: 20px;
}

.question-title {
    flex-grow: 1;
}

.block-counter {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.score {
    font-weight: 400;
    color: rgba(0, 0, 0, 0.54);
}


.quiz-container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px 2px rgba(100, 100, 100, 0.1);
    margin: 20px 0;
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
}

.btn:hover {
    background: #7349bb;
}

.btn:active {
    opacity: 0.4;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}

</style>
