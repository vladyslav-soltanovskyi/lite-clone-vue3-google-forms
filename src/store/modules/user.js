import axios from "axios";
import router from "@/router";

export default {
    namespaced: true,
    state: {
        user: null,
        errors: null
    },
    mutations: {
        SESSION_SET(state, response) {
            state.user = response.user;
            localStorage.setItem("auth_token", response.token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${response.token}`;
        },
        logout(state) {
            state.user = null;
            localStorage.removeItem("auth_token");
            axios.defaults.headers.common["Authorization"] = null;
            router.push({ path: '/login'});
        },
        setUser(state, user) {
            state.user = user;
        },
        setErrors(state, errors) {
            state.errors = errors;
        }
    },
    actions: {
        async register({ commit }, credentials) {
            try {
                const response = await axios.post("/api/register", credentials);
                commit("SESSION_SET", response.data);
                router.push({ path: '/'});

              } catch (error) {
                console.error(error);
            }
        },
        async login({ commit }, credentials) {
            try {
                const response = await axios.post("/api/login", credentials);
                if(response.data.status) {
                    commit("SESSION_SET", response.data);
                    commit('setErrors', null);
                    router.push({ path: '/'});
                }
                else {
                    commit('setErrors', response.data.errors);
                }

              } catch (error) {
                console.log(error);
            }
        },
        async refresh({ commit }) {
            try {
                const response = await axios.get("/api/refresh");
                commit("SESSION_SET", response.data);

              } catch (error) {
                console.dir(error);
            }
        },
        async edit({ commit }, user) {
            try {
                let changedUserData = {...user, avatar: user.avatar ? getSrc(user.avatar) : user.avatar };
                commit("setUser", changedUserData);
                const response = await axios.post(`/api/user/edit/${user.id}`, formatFormData(user));
                commit("setUser", response.data.user);

              } catch (error) {
                console.error(error);
            }
        }
    },
    getters: {
        loggedIn(state) {
            return !!state.user;
        },
        user(state) {
            return state.user;
        },
        errors(state) {
            return state.errors;
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