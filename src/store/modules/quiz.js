import axios from "axios";
import router from "@/router";

export default {
    namespaced: true,
    state: {
        quiz: {},
        isLoading: false
    },
    getters: {
        quiz(state) {
            return state.quiz;
        },
        isLoading(state) {
            return state.isLoading;
        }
    },
    mutations: {
        set(state, quiz) {
            state.quiz = quiz;
        },
        setIsLoading(state, status) {
            state.isLoading = status;
        },
        delete(state) {
            state.quiz = [];
            router.push({ path: '/'});
        },
        edit(state, quiz) {
            for(let key in quiz) {
                state.quiz[key] = quiz[key];
            }
        }
    },
    actions: {
        async get({ commit }, id) {
            try {
                commit('setIsLoading', true);
                const response = await axios.get(`/api/quizzes/${id}`);
                commit("set", response.data.quiz);
                commit("questions/setQuestions", response.data.questions, { root: true });

              } catch (error) {
                commit('setIsLoading', false);
                console.error(error);
            } finally {
                commit('setIsLoading', false);
            }
        },
        async getForSelect({ commit }, id) {
            try {
                commit('setIsLoading', true);
                const response = await axios.get(`/api/quizzes/${id}`);
                commit("set", response.data.quiz);
                commit("questions/setQuestionsForSelect", response.data.questions, { root: true });

              } catch (error) {
                commit('setIsLoading', false);
                console.error(error);
            } finally {
                commit('setIsLoading', false);
            }
        },
        async edit({ commit }, quiz) {
            try {
                commit("edit", quiz);
                await axios.put(`/api/quizzes/${quiz.id}`, quiz);

              } catch (error) {
                console.error(error);
            }
        },
        async delete({ commit }, id) {
            try {
                commit("delete", id);
                await axios.delete(`/api/quizzes/${id}`);

              } catch (error) {
                console.error(error);
            }
        },
    },
};
