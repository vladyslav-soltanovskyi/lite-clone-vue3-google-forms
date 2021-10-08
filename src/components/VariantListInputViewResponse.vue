<template>
    <div class="questions">
        <div class="question" :class="statusShow">
            <div class="field">
                <FormInput ref="last_input" 
                        class="form-input"
                        :id="question.id"
                        :value="question.value"
                        :placeholder="''"
                        :disabled="true" />
            </div>
            <template v-if="isCorrectAnswer">
                <i class="fas fa-check"></i>
            </template>
            <template  v-else>
                <i class="fas fa-times"></i>
            </template>
        </div>
        <div v-if="!isCorrectAnswer && question.variants.length">
            <p class="correct-title" v-if="question.variants.length > 1">Правильные ответы</p>
            <p class="correct-title" v-else>Правильный ответ</p>
            <template v-for="variant in question.variants" :key="variant.id">
                <p class="correct-answer" >
                    {{ variant.answer }}
                </p>
            </template>
        </div>
    </div>
</template>
<script>
import FormInput from './FormInput.vue';
export default {
    props: ['question'],
    computed: {
        isCorrectAnswer() {
            return this.question.variants.some(variant => variant.answer === this.question.value);
        },
        statusShow() {
            return this.isCorrectAnswer ? 'active' : 'un-correct';
        }
    },
    components: {
        FormInput
    }
}
</script>

<style scoped>
.questions {
    list-style: none;
    padding: 0;
}

.questions .question {
    margin: 1rem 0;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    padding: 4px 10px;
    border-radius: 5px;
    align-items: center;
}

.questions .question label {
    font-weight: 400;
}

.form-input {
    margin-right: 10px;
}

.add-variant {
    display: flex;
    box-sizing: border-box;
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

.questions .question.un-correct i {
    color: #d93025;
}

.field {
    display: flex;
    flex-grow: 1;
}

.correct-title {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: .25px;
    line-height: 20px;
    color: #70757a;
    margin-bottom: 8px;
}

.correct-answer {
    font-size: 14px;
}
</style>