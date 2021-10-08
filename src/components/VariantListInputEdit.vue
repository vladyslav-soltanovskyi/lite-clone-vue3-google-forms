<template>
    <div class="questions">
        <div class="question">
            <FormInput class="form-input"
                       :placeholder="'Краткий ответ'"
                       :disabled="isEdit"
                       />
        </div>
        <div class="question" v-if="question.variants.length">
            <span class="correct-title">Правильные ответы:&nbsp;</span>
            <span class="correct-answer" v-for="(variant, index) in question.variants" :key="variant.id">
                <template v-if="index < (question.variants.length - 1)">
                    {{ variant.answer }}{{ question.variants.length > 1 ? ',&nbsp;' : '' }}
                </template>
                <template v-else>{{ variant.answer }}</template>

            </span>
        </div>
    </div>
</template>

<script>
import FormInput from './FormInput.vue';
export default {
    props: {
        question: {
            type: Object,
        },
        isEdit: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        changeAnswer({ value }, variant) {
            this.$store.commit('questions/changeVariantInputSelect', {variant, value});
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
    align-items: center;
    max-width: 50%;
}

.questions .question label {
    font-weight: 400;
}

.form-input {
    margin-right: 10px;
}

.correct-title {
    font-size: 12px;
    color: #1e8e3e;
}

.correct-answer {
    font-size: 12px;
}
</style>