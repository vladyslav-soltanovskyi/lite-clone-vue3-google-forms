import axios from 'axios';
import router from "@/router";

export default {
	namespaced: true,
	state: {
        response: null,
        isLoading: false,
        isSending: false
	},
	getters: {
		response(state){
			return state.response;
		},
        isLoading(state){
			return state.isLoading;
		},
        isSending(state){
			return state.isSending;
		}
	},
    mutations: {
        setResponse(state, response) {
            state.response = response;
        },
        setIsLoading(state, status) {
            state.isLoading = status;
        },
        setIsSending(state, status) {
            state.isSending = status;
        }
    },
    actions: {
        async get({ commit }, id) {
            try {
                commit('setIsLoading', true);
                const response = await axios.get(`/api/responses/${id}`);
                commit("setResponse", response.data.response);

            } catch (error) {
                commit('setIsLoading', false);
                console.error(error);
            } finally {
                commit('setIsLoading', false);
            }
        },
        async add({ commit, rootGetters, state }) {
            try {
                commit('setIsSending', true);
                let quiz = rootGetters['quiz/quiz'];
                let totalScore = rootGetters['questions/totalScore'];
                let score = rootGetters['questions/score'];
                let user = rootGetters['user/user'];
                let questions = rootGetters['questions/questions'];
                let response = await axios.post(`/api/responses`, { 
                    questions: JSON.stringify(questions), 
                    user_id: user.id, 
                    quiz_id: quiz.id, 
                    totalScore,
                    score
                });
                commit('setResponse', response.data.response);

              } catch (error) {
                console.error(error);
            } finally {
                commit('setIsSending', false);
                router.push({ name: 'QuizResponse', params: { id: state.response.quiz.id }});
            }
        }
    }
};



