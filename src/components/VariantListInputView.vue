<template>
    <div class="questions">
        <div class="question">
            <FormInput class="form-input"
                       :placeholder="'Краткий ответ'"
                       :disabled="isEdit"
                       @changeTitle="changeValueQuestion($event)"
                       :id="question.id"
                       :value="question.value"
                       />
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
        changeValueQuestion({id, value}) {
            this.$store.dispatch('questions/edit', { id, value });
        },
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

</style>