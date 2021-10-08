<template>
    <div class="questions">
        <div class="question" v-for="variant in question.variants" :key="variant.id">
            <FormInput ref="last_input" 
                       class="form-input"
                       :id="variant.id"
                       :value="variant.answer"
                       :placeholder="'Краткий ответ'"
                       @changeTitle="changeValueVariant($event, variant)" />
            <span 
                type="button" 
                class="close" 
                @click="deleteVariant(variant)"
                ></span>
        </div>
        <div class="question">
            <label class="add-variant">
                <FormInput ref="input" @click="addVariant(question)" @focused="addVariant(question)" :placeholder="'Добавить правильный ответ'"/>
            </label>
        </div>
    </div>
</template>
<script>
import FormInput from './FormInput.vue';
export default {
    props: ['question'],
    methods: {
        async addVariant(question) {
            let variant = {
                id: Date.now(),
                answer: 'Правильный ответ',
                correct: 1,
                question_id: question.id
            };
            await this.$store.commit('questions/addVariant', variant);
            this.$refs.input.$el.children[0].blur();
            await this.$store.dispatch('questions/addVariant', variant);
            this.$refs.last_input.$el.children[0].focus();
        },
        changeValueVariant({ value }, variant) {
            let data = { answer: value };
            this.$store.dispatch('questions/editVariant', { data, variant });
        },
        deleteVariant(variant) {
            this.$store.dispatch('questions/deleteVariant', variant);
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

.add-variant {
    display: flex;
    box-sizing: border-box;
}


.close {
    position: relative;
    width: 16px;
    height: 16px;
    opacity: 0.3;
    cursor: pointer;
}
.close:hover {
    opacity: 1;
}
.close:before, .close:after {
    position: absolute;
    content: ' ';
    height: 16px;
    width: 2px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
}
.close:before {
    transform: rotate(45deg);
}
.close:after {
    transform: rotate(-45deg);
}

</style>