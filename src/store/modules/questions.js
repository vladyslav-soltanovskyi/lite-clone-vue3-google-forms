import axios from 'axios';

export default {
	namespaced: true,
	state: {
		questions: []
	},
	getters: {
		questions(state){
			return state.questions;
		},
        questionsLength(state) {
            return state.questions.length;
        },
        totalScore(state) {
            return state.questions.reduce((total, question) => total + question.score, 0);
        },
        score(state) {
            return state.questions.reduce((total, question) => {
                let types = ['checkbox', 'radio'];
                if (!types.includes(question.type)) {
                    let score = question.variants.some(variant => variant.answer === question.value) ? question.score : 0;
                    return total + score;
                }
                return total + question.variants.reduce((total, variant) => {

                    let isCorrectSelectVariants = (question.variants.every(variant => variant.select ? variant.correct === 1 : true ));
                    if(!isCorrectSelectVariants) {
                        return 0;
                    }
                    let sizeOfCorrectVaraints = (question.variants.filter(variant => variant.correct === 1)).length;
                    return total + (variant.select && variant.correct === 1 ? question.score / sizeOfCorrectVaraints : 0);
                }, 0);
            }, 0);
        }
	},
    mutations: {
        setQuestions(state, questions) {
            let newQuestions = [];
            for (let i = 0; i < questions.length; i++) {
                newQuestions[i] = questions[i];
                newQuestions[i].isEdit = false;
            }
            state.questions = newQuestions;
        },
        setQuestionsForSelect(state, questions) {
            let types = ['radio', 'checkbox'];
            state.questions = questions.map(question => {
                if (!types.includes(question.type)) {
                    question.value = '';
                    return question;
                }
                question.variants.map(variant => {
                    variant.select = false;
                    return variant;
                });
                return question;
            });
        },
        changeVariantRadioSelect(state, variant) {
            let question = state.questions.find((question) => variant.question_id === question.id);
            question.variants.map(variantItem => {
                variantItem.select = false;
                return variantItem;
            });
            let variantItem = question.variants.find(variantItem => variantItem.id === variant.id);
            variantItem.select = !variantItem.select;
        },
        changeVariantCheckboxSelect(state, variant) {
            let question = state.questions.find((question) => variant.question_id === question.id);
            let variantItem = question.variants.find(variantItem => variantItem.id === variant.id);
            variantItem.select = !variantItem.select;
        },
        changeVariantInputSelect(state, { variant, value}) {
            let question = state.questions.find((question) => variant.question_id === question.id);
            let variantItem = question.variants.find(variantItem => variantItem.id === variant.id);
            variantItem.answer = value;
        },
        set(state, questions) {
            state.questions = questions;
        },
        moveQuestions(state, questions) {
            state.questions = questions.map((question, index) => {
                question.position = index;
                return question;
            });
        },
        delete(state, id) {
            state.questions = state.questions.filter((question) => id !== question.id);
        },
        edit(state, question) {
            let questionItem = state.questions.find(item => item.id === question.id);
            let types = ['radio', 'checkbox'];
            if(question.type !== null && typeof question.type !== "undefined") {
                if(types.includes(questionItem.type) && !types.includes(question.type)) {
                    questionItem.variants = [{
                        id: Date.now(),
                        answer: '',
                        correct: 0,
                        question_id: question.id
                    }];
                }
                else if(!types.includes(questionItem.type) && types.includes(question.type)) {
                    questionItem.variants = [{
                        id: Date.now(),
                        answer: 'Вариант 1',
                        correct: 0,
                        question_id: question.id
                    }];
                }
            }

            for (let key in question) {
                questionItem[key] = question[key];
            }
        },
        changeQuestion(state, { index, question }) {
            state.questions[index] = question;
        },
        add(state, { index, question }) {
            state.questions = [
                ...state.questions.slice(0, index),
                question,
                ...state.questions.slice(index, state.questions.length)
                ];
        },
        deleteVariant(state, { id, question_id }) {
            let question = state.questions.find((question) => question_id === question.id);
            question.variants = question.variants.filter(item => item.id !== id);
        },
        editVariant(state, { data, variant }) {
            let question = state.questions.find(item => item.id === variant.question_id);
            let variantItem = question.variants.find(item => item.id === variant.id);

            for (let key in data) {
                variantItem[key] = data[key];
            }
        },
        addVariant(state, variant) {
            let question = state.questions.find(item => item.id === variant.question_id);
            question.variants.push(variant);
        },
        changeVariant(state, variant) {
            let question = state.questions.find(item => item.id === variant.question_id);
            let lengthVariants = question.variants.length;
            question.variants[lengthVariants - 1] = variant;
        }
    },
    actions: {
        async add({ state, getters, commit, dispatch }, question) {
            try {
                let { position } = question;
                commit("add", { index: position, question });
                commit('moveQuestions', state.questions);
                commit("currentBlock/setIdBlock", position + 1, { root: true });
                
                let positionIndex = position >= 0 && position < getters.questionsLength ? position : getters.questionsLength - 1;
                const response = await axios.post("/api/questions", question);
                commit("changeQuestion", { index: positionIndex, question: response.data.question });
                dispatch('moveQuestions', state.questions);


            } catch (error) {
                console.error(error);
            }
        },
        async delete({ commit, dispatch, state }, question) {
            try {
                commit("currentBlock/setIdBlock", question.position, { root: true });
                commit("delete", question.id);
                await axios.delete(`/api/questions/${question.id}`);
                dispatch('moveQuestions', state.questions);

              } catch (error) {
                console.error(error);
            }
        },
        async edit({ commit }, question) {
            try {
                commit("edit", question);
                await axios.put(`/api/questions/${question.id}`, question);
                // let response = 
                // commit('changeQuestion', { index: response.data.question.position, question: response.data.question});

              } catch (error) {
                console.error(error);
            }
        },
        async moveQuestions({ commit }, questions) {
            try {
                commit('moveQuestions', questions);
                let response = await axios.post('/api/moveQuestions', {questions});
                commit('set', response.data.questions);
            } catch (error) {
                console.error(error);
            }
        },
        async addVariant({ commit }, variant) {
            try {
                const response = await axios.post("/api/variants", variant);
                commit("changeVariant", response.data.variant);

              } catch (error) {
                console.error(error);
            }
        },
        async deleteVariant({ commit }, variant) {
            try {
                commit("deleteVariant", variant);
                await axios.delete(`/api/variants/${variant.id}`);

              } catch (error) {
                console.error(error);
            }
        },
        async editVariant({ commit }, { data, variant }) {
            try {
                commit("editVariant", { data, variant });
                await axios.put(`/api/variants/${variant.id}`, data);

              } catch (error) {
                console.error(error);
            }
        },
    }
};



