<template>
    <div class="questions">
        <div class="question" v-for="variant in question.variants" :key="variant.id">
            <CustomCheckBox :disabled="true" @click="focusForNextInput" />
            <FormInput ref="last_input" class="form-input" @changeTitle="changeValueVariant($event, variant)" :id="variant.id" :value="variant.answer" />
            <span 
                type="button" 
                class="close" 
                @click="deleteVariant(variant)"
                v-if="showButtonDelete"
                ></span>
        </div>
        <div class="question">
            <CustomCheckBox :disabled="true" @click="focusForNextInput" />
            <label class="add-variant">
                <FormInput ref="input" @click="addVariant(question)" @focused="addVariant(question)" :placeholder="'Добавить вариант'"/>
            </label>
        </div>
    </div>
</template>

<script>
import CustomCheckBox from './CustomCheckBox.vue';
import FormInput from './FormInput.vue';
export default {
    props: ['question'],
    computed: {
        showButtonDelete() {
            return this.question.variants.length > 1;
        }
    },
    methods: {
        async addVariant(question) {
            let variant = {
                id: Date.now(),
                answer: `Вариант ${question.variants.length + 1}`,
                correct: 0,
                question_id: question.id
            };
            await this.$store.commit('questions/addVariant', variant);
            console.dir(this.$refs.last_input);
            this.$refs.input.$el.children[0].blur();
            await this.$store.dispatch('questions/addVariant', variant);
            this.$refs.last_input.$el.children[0].focus();
        },
        focusForNextInput($event) {
            $event.target.parentElement.nextElementSibling.children[0].focus();

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
        FormInput, CustomCheckBox
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
}

.questions .question label {
    cursor: pointer;
    font-weight: 400;
}

/* .form-input { */
    /* margin-right: 10px; */
/* } */

.add-variant {
    max-width: 145px;
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