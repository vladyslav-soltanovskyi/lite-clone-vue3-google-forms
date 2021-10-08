export default {
    namespaced: true,
    state: {
        currentBlock: -1,
        tab: window.location.hash.slice(1)
    },
    mutations: {
        setIdBlock(state, id) {
            state.currentBlock = id;
        },
        setTab(state, tab) {
            state.tab = tab;
        }
    },
    getters: {
        currentBlock(state) {
            return state.currentBlock;
        },
        tab(state) {
            return state.tab;
        }
    }
};
