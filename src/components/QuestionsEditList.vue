<template>
  <div class="quiz">
    <SortableList :value="questions" @changeQuestions="changeQuestions">
        <SortableItem v-for="question in questions" :key="question.id" >
            <div class="quiz-container" @click="changeCurrentBlock(question.position)" :class="{ active: isActive(question.position) }">
                <div class="quiz-header">
                     <SortableHandle>
                        <svg class="handle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M14 4h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM8 4h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm6 6h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zm-6 0h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zm6 6h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zm-6 0h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z"/></svg>
                    </SortableHandle>

                    <template v-if="question.isEdit">
                        <div class="question-title-box edit-score">
                            <p class="question-title">{{ question.question }}</p>
                            <div class="block-counter">
                                <div class="counter">
                                    <Counter :score="question.score" @changeScore="changeScore($event, question)" :max="1000"/>
                                </div>
                                <span class="score">балл.</span>
                            </div>
                        </div>
                        
                        <template v-if="question.type === 'radio'">
                            <VariantListRadioViewScore :question="question" />
                        </template>

                        <template v-if="question.type === 'checkbox'">
                            <VariantListCheckBoxViewScore :question="question" />
                        </template>

                        <template v-if="question.type === 'input'">
                            <VariantListInputViewScore :question="question" />
                        </template>

                        <BlockBottomForAccept v-if="isActive(question.position)" :question="question"/>
                    </template>

                    <template v-else>
                        <div class="question-title-box" v-if="!isActive(question.position)">{{ question.question }}</div>
                        <div class="question-title-box" v-else>
                                <div class="form-input-container">
                                    <FormInput @changeTitle="changeValueQuestion($event)"
                                               :id="question.id"
                                               :value="question.question"
                                               :size="16"
                                               :color="'title'" />
                                </div>
                                <CustomSelect @chagneType="chagneType" :id="question.id" :value="question.type" />
                        </div>
                        <template v-if="question.type === 'radio'">
                            <VariantListRadioEdit v-if="isActive(question.position)" :question="question" />
                            <VariantListRadioView v-else :question="question" />

                        </template>
                        <template v-if="question.type === 'checkbox'">
                            <VariantListCheckBoxEdit v-if="isActive(question.position)" :question="question" />
                            <VariantListCheckBoxView v-else :question="question" />

                        </template>
                        <template v-if="question.type === 'input'">
                            <VariantListInputEdit v-if="isActive(question.position)" :question="question" />
                            <VariantListInputView v-else :question="question" />

                        </template>
                        <BlockActionsForVariantList v-if="isActive(question.position)" :question="question"/>
                    </template>
                </div>
            </div>
        </SortableItem>
    </SortableList>
  </div>
</template>

<script>
import FormInput from './FormInput.vue';
import CustomSelect from "./CustomSelect.vue";
import VariantListRadioView from "./VariantListRadioView.vue";
import VariantListRadioEdit from "./VariantListRadioEdit.vue";
import VariantListCheckBoxEdit from "./VariantListCheckBoxEdit.vue";
import VariantListCheckBoxView from "./VariantListCheckBoxView.vue";
import VariantListInputView from "./VariantListInputView.vue";
import VariantListInputEdit from "./VariantListInputEdit.vue";
import VariantListRadioViewScore from "./VariantListRadioViewScore.vue";
import VariantListCheckBoxViewScore from "./VariantListCheckBoxViewScore.vue";
import VariantListInputViewScore from "./VariantListInputViewScore.vue";
import BlockBottomForAccept from "./BlockBottomForAccept.vue";
import Counter from "./Counter.vue";
import SortableList from "./SortableList.vue";
import SortableItem from "./SortableItem.vue";
import SortableHandle from "./SortableHandle.vue";
import BlockActionsForVariantList from './BlockActionsForVariantList.vue';
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('currentBlock', ['currentBlock']),
        ...mapGetters('questions', ['questions'])
    },
    methods: {
        changeValueQuestion({id, value}) {
            this.$store.dispatch('questions/edit', {id, question: value});
        },
        changeQuestions(questions) {
            this.$store.dispatch('questions/moveQuestions', questions);
        },
        changeScore(number, question) {
            this.$store.dispatch('questions/edit', {id: question.id, score: number });
        },
        chagneType(data) {
            this.$store.dispatch("questions/edit", data)
        },
        changeCurrentBlock(id) {
            this.$store.commit('currentBlock/setIdBlock', (id + 1));
        },
        isActive(id) {
            return this.currentBlock === (id + 1);
        },
    },
    components: {
        Counter,
        FormInput,
        CustomSelect,
        VariantListRadioView,
        VariantListRadioEdit,
        SortableList,
        SortableItem,
        SortableHandle,
        BlockActionsForVariantList,
        VariantListCheckBoxEdit,
        VariantListCheckBoxView,
        VariantListInputView,
        VariantListInputEdit,
        VariantListRadioViewScore,
        VariantListCheckBoxViewScore,
        VariantListInputViewScore,
        BlockBottomForAccept
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

.handle-container {
    width: 24px;
    height: 24px;
    margin: 0 auto;
}

.handle {
    transform: rotate(90deg);
    color: #b4b4b4;
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
    max-width: 110px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.counter {
    width: 50%;
}

.score {
    font-weight: 400;
}

.form-input-container {
    width: 350px;
    display: flex;
    align-items: center;
}

.quiz-container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px 2px rgba(100, 100, 100, 0.1);
    margin: 20px 0;
}

.quiz-container.active {
    border-left: 7px solid #4285f4;
}

.quiz-header {
    padding: 2rem;
}


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
}

button {
    background-color: #8e44ad;
    border: none;
    color: white;
    cursor: pointer;
    display: block;
    outline: none;
    font-family: inherit;
    font-size: 1.4rem;
    width: 100%;
    padding: 1.3rem;
}

button:hover {
    background-color: #732d91;
}

button:active {
    background-color: #5e3370;
    outline: none;
}



.close {
    position: relative;
    width: 16px;
    height: 16px;
    opacity: 0.3;
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
