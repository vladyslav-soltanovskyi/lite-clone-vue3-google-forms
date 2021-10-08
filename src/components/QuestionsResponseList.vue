<template>
    <div class="quiz">
        <div class="quiz-container" v-for="question in questionsData" :key="question.id">
            <div class="quiz-header">
                <div class="question-title-box edit-score">
                    <p class="question-title">
                        <template v-if="isCorrectSelectVariants(question)">
                            <i class="fas fa-check correct"></i>
                        </template>
                        <template v-else>
                            <i class="fas fa-times un-correct"></i>
                        </template>
                        {{ question.question }}
                    </p>
                    <div class="block-counter">
                        <span class="score">{{ getScore(question) }} из {{ question.score }}</span>
                    </div>
                </div>
                <template v-if="question.type === 'radio'">
                    <VariantListRadioViewResponse :question="question" />

                </template>
                <template v-if="question.type === 'checkbox'">
                    <VariantListCheckBoxViewResponse :question="question" />

                </template>
                <template v-if="question.type === 'input'">
                    <VariantListInputViewResponse :question="question" :isEdit="false" />

                </template>
            </div>
        </div>
    </div>
</template>

<script>
import VariantListRadioViewResponse from "./VariantListRadioViewResponse.vue";
import VariantListCheckBoxViewResponse from "./VariantListCheckBoxViewResponse.vue";
import VariantListInputViewResponse from "./VariantListInputViewResponse.vue";

export default {
    data: () => ({ questionsData: [] }),
    props: ['questions'],
    mounted() {
        this.questionsData = JSON.parse(this.questions);
    },
    methods: {
        isCorrectSelectVariants(question) {
            let types = ['checkbox', 'radio'];
            if (!types.includes(question.type)) {
                return question.variants.some(variant => variant.answer === question.value);
            }
            let isSomeVariantSelect = (question.variants.some(variant => variant.select));
            return (question.variants.every(variant => variant.select ? variant.correct === 1 : true )) && isSomeVariantSelect;
        },
        getScore(question) {
            let types = ['checkbox', 'radio'];
            if (!types.includes(question.type)) {
                return this.isCorrectSelectVariants(question) ? question.score : 0;
            }

            return question.variants.reduce((total, variant) => {
                let isCorrectSelectVariants = this.isCorrectSelectVariants(question);
                if(!isCorrectSelectVariants) {
                    return 0;
                }
                let sizeOfCorrectVaraints = (question.variants.filter(variant => variant.correct === 1)).length;
                return total + (variant.select && variant.correct === 1 ? question.score / sizeOfCorrectVaraints : 0);
            }, 0);
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
        }
    },
    components: {
        VariantListRadioViewResponse,
        VariantListCheckBoxViewResponse,
        VariantListInputViewResponse
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

.question-title i.correct {
    color: #1e8e3e;
    font-size: 16px;
}

.question-title i.un-correct {
    color: #d93025;
    font-size: 16px;
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
