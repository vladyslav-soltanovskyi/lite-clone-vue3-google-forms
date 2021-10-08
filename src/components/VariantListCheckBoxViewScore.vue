<template>
    <div class="questions">
        <div class="question" v-for="variant in question.variants" :key="variant.id" @click="changeValueVariant(variant)" :class="{ active: isCorrect(variant.correct) }">
            <div class="field">
                <CustomCheckBox :disabled="true" />
                <label class="answer-value" :for="question.id + '-' + variant.id"> {{ variant.answer }}</label>
            </div>
            <div v-if="isCorrect(variant.correct)">
                <i class="fas fa-check"></i>
            </div>
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
        changeValueVariant(variant) {
            let toggleCorrect = variant.correct === 0 ? 1 : 0;
            let data = { correct: toggleCorrect };
            this.$store.dispatch('questions/editVariant', { data, variant });
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

i {
    color: #1e8e3e;
}

.field {
    display: flex;
    flex-grow: 1;
}

.questions .question label {
    cursor: pointer;
    font-weight: 400;
    /* padding-left: 15px; */
}
</style>