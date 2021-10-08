import axios from "axios";

export default {
    namespaced: true,
    state: {
        quizzes: [],
        quizzesAll: [],
        isLoading: false
    },
    mutations: {
        set(state, quizzes) {
            state.quizzes = quizzes;
        },
        setIsLoading(state, status) {
            state.isLoading = status;
        },
        setQuizAll(state, quizzes) {
            state.quizzesAll = quizzes;
        },
        delete(state, id) {
            state.quizzes = state.quizzes.filter((quiz) => id !== quiz.id);
        },
        edit(state, quiz) {
            let quizItem = state.quizzes.find(quizItem => quizItem.id === quiz.id);
            for (let key in quiz) {
                quizItem[key] = quiz[key];
            }
        },
        add(state, quiz) {
            state.quizzes.unshift(quiz);
        },
        changeLastAddedQuiz(state, quiz) {
            state.quizzes[0] = quiz;
        },
        changeByIdQuiz(state, quiz) {
            state.quizzes = state.quizzes.map(quizItem => quizItem.id === quiz.id ? quiz : quizItem);
        }
    },
    actions: {
        async getPersonalQuizzes({ commit }) {
            try {
                commit('setIsLoading', true);
                const response = await axios.get("/api/personalQuizzes");
                commit("set", response.data.quizzes);

            } catch (error) {
                commit('setIsLoading', false);
                console.error(error);
            } finally {
                commit('setIsLoading', false);
            }
        },
        async getAll({ commit }) {
            try {
                commit('setIsLoading', true);
                const response = await axios.get("/api/quizzes");
                commit("setQuizAll", response.data.quizzes);

            } catch (error) {
                commit('setIsLoading', false);
                console.error(error);
            } finally {
                commit('setIsLoading', false);
            }
        },
        async add({ commit }, quiz) {
            try {
                let newQuiz = formatFormData(quiz);
                commit("add", quiz);
                const response = await axios.post("/api/quizzes", newQuiz);
                commit("changeLastAddedQuiz", response.data.quiz);

              } catch (error) {
                console.error(error);
            }
        },
        async edit({ commit }, quiz) {
            try {
                let editQuiz = formatFormData(quiz);
                let updatedQuiz = {...quiz, image: quiz.image ? getSrc(quiz.image) : quiz.image };
                commit("edit", updatedQuiz);
                const response = await axios.post(`/api/quizzes/update/${quiz.id}`, editQuiz);
                commit("changeByIdQuiz", response.data.quiz);

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
    getters: {
        quizzes(state) {
            return state.quizzes;
        },
        quizzesAll(state) {
            return state.quizzesAll;
        },
        isLoading(state) {
            return state.isLoading;
        }
    }
};

function getSrc(photo) {
    return URL.createObjectURL(photo);
}

function formatFormData(data) {
    let formData = new FormData();
    for (let item in data) {
        formData.append(item, data[item]);
    }
    return formData;
}