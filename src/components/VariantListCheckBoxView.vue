<template>
    <ul class="questions" >
        <li class="question" v-for="variant in question.variants" :key="variant.id">
            <CustomCheckBox :value="variant.answer"
                            :variant="variant"
                            @changeSelect="changeSelect"
                            :isCheck="variant.select"
                            />
            <!-- <label class="answer-value" :for="question.id + '-' + variant.id"> {{ variant.answer }}</label> -->
        </li>
    </ul>
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
        changeSelect(variant) {
            this.$store.commit('questions/changeVariantCheckboxSelect', variant);
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
    margin: 1rem 0;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.questions .question label {
    cursor: pointer;
    font-weight: 400;
    /* padding-left: 15px; */
}
</style>