<template>
    <div class="questions">
        <div class="question" v-for="variant in question.variants" :key="variant.id" :class="statusShow(variant)">
            <div class="field">
                <CustomCheckBox :disabled="true" />
                <label class="answer-value" :for="question.id + '-' + variant.id"> {{ variant.answer }}</label>
            </div>
            <template v-if="variant.select && isCorrect(variant.correct)">
                <i class="fas fa-check"></i>
            </template>
            <template  v-if="variant.select && !isCorrect(variant.correct)">
                <i class="fas fa-times"></i>
            </template>
        </div>
    </div>
</template>

<script>
import CustomCheckBox from './CustomCheckBox.vue';
export default {
    props: {
        question: {
            type: Object
        }
    },
    methods: {
        statusShow(variant) {
            return { 
                active: variant.select ? this.isCorrect(variant.correct) : false,
                'un-correct': variant.select ? !this.isCorrect(variant.correct) : false
            };
        },
        isCorrect(correct) {
            return correct === 1;
        }
    },
    components: {
        CustomCheckBox
    }
}
</script>

<style scoped>
.questions {
    list-style: none;
    padding: 0;
}

.questions .question {
    /* margin: 1rem 0; */
    margin: 4px 0;
    padding: 10px;
    border-radius: 5px;
    position: relative;
    display: flex;
}

.questions .question.active {
    background: #e6f4ea;
}

.questions .question.un-correct {
    background-color: #fce8e6;
}

.questions .question.active i {
    color: #1e8e3e;
}

.questions .question.un-correct  i{
    color: #d93025;
}

.field {
    display: flex;
    flex-grow: 1;
}

.questions .question label {
    cursor: default;
    font-weight: 400;
    /* padding-left: 15px; */
}
</style>