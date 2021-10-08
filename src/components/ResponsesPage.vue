<template>
    <div class="responses">
        <div class="responses-container">
            <div class="responses-header">
                <h2 class="responses-title">{{ genitive(responses.length) }}</h2>
            </div>
            <div class="responses-main">
                <ResponseList :responses="responses" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ResponseList from './ResponseList.vue';
export default {
    computed: {
        ...mapGetters('responses', ['responses'])
    },
    methods: {
        genitive(n) {
            let word = {singular: 'Ответ', many1: 'Ответа', many2: 'Ответов'};
            let res = word.many2;
            if (n % 100 < 5 || n % 100 > 20) {
                if (n % 10 == 1) {
                    res = word.singular;
                }
                if (n % 10 > 1 && n % 10 < 5) {
                    res = word.many1; 
                }
            }
            return `${n} ${res}`;
        },
    },
    components: {
        ResponseList
    }
}
</script>


<style scoped>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

.responses {
    max-width: 700px;
    position: relative;
    padding-top: 40px;
    margin: 0 auto;
}

.responses-title {
    font-size: 28px;
    font-weight: 400;
    display: flex;
}

.responses-container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px 2px rgba(100, 100, 100, 0.1);
    /* overflow: hidden; */
    margin-top: 10px;
    padding-left: 5px;
}

.responses-header {
    padding: 2rem;
}

.responses-main {
    padding: 0 1.5rem 1.5rem 1.5rem;
}
</style>