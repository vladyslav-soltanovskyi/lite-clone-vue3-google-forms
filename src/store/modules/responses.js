import axios from 'axios';

export default {
	namespaced: true,
	state: {
		responses: [],
        isLoading: false,
        isSending: false
	},
	getters: {
		responses(state){
			return state.responses;
		},
        isLoading(state){
			return state.isLoading;
		},
        isSending(state){
			return state.isSending;
		},
        sizeOfResponses(state){
			return state.responses.length;
		}
	},
    mutations: {
        setResponses(state, responses) {
            state.responses = responses;
        },
        setIsLoading(state, status) {
            state.isLoading = status;
        },
        setIsSending(state, status) {
            state.isSending = status;
        }
    },
    actions: {
        async getAll({ commit }, id ) {
            try {
                commit('setIsLoading', true);
                const response = await axios.get(`/api/responses/getAll/${id}`);
                commit("setResponses", response.data.responses);

            } catch (error) {
                commit('setIsLoading', false);
                console.error(error);
            } finally {
                commit('setIsLoading', false);
            }
        },
    }
};



