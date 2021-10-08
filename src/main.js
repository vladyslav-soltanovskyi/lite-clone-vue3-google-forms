import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import VueClickAway from "vue3-click-away";
import clickOutside from './directives/clickOutside';

axios.defaults.baseURL = 'http://127.0.0.1:8000';
// axios.defaults.withCredentials = true;

async function main () {
    const authToken = localStorage.getItem("auth_token");

    if (authToken) {
        axios.defaults.headers.common.Authorization =
            "Bearer " + authToken;
            await store.dispatch("user/refresh");
    }
    
    createApp(App)
            .use(store)
            .use(router)
            .directive("click-outside", clickOutside)
            .use(VueClickAway)
            .mount('#app');
}

main();