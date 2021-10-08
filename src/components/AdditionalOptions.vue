<template>
    <div class="additional-options" :style="currentPositionTop">
        <ul>
            <li @click="addQuestion" class="option" title="Добавить вопрос"><i class="fas fa-plus"></i></li>
            <li class="option" title="Просмотр">
                <router-link
                        :to="'/quiz/' + idPage"
                        tag="i"
                        target="_blank"
                        class="far fa-eye eye"></router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import _ from 'lodash';
import { mapGetters } from 'vuex';

export default {
    data: () => ({
        top: document.documentElement.scrollTop + window.innerHeight - 500
    }),
    computed: {
        idPage() {
            return this.$route.params.id;
        },
        currentPositionTop() {
            return {top: this.top + 'px'};
        },
        ...mapGetters('currentBlock', ['currentBlock']),
        ...mapGetters('questions', ['questionsLength']),
    },
    methods: {
        addQuestion() {
            let position = this.currentBlock >= 0 && this.currentBlock <= this.questionsLength ? this.currentBlock : this.questionsLength;
            let id = Date.now();
            this.$store.dispatch('questions/add', {
                    id: id,
                    question: "Вопрос",
                    score: 0,
                    type: 'radio',
                    position,
                    quiz_id: this.$route.params.id,
                    variants: [{
                        id,
                        answer: 'Вариант 1',
                        correct: 0,
                        question_id: id
                    }]
                });
        },
    },
    mounted() {
        const eventHandler = () => {
                const scrollTop = document.documentElement.scrollTop;
                const viewportHeight = window.innerHeight;
                // const totalHeight = document.documentElement.offsetHeight;
                const currentPosition = scrollTop + viewportHeight - 500;

                // if (atTheBottom) {
                //     this.$emit('at-the-bottom')
                // }
                this.top = currentPosition;
            }
        
        window.delayedHandler = _.throttle(eventHandler, 100)

        window.addEventListener('scroll', window.delayedHandler);
    },
    unmounted() {
        window.removeEventListener('scroll', window.delayedHandler);
    }
}
</script>


<style scoped>
.additional-options {
    background-color: #fff;
    transition: 0.35s top;
    position: absolute;
    border-radius: 10px;
    /* padding: 5px; */
    top: 200px;
    /* right: -50px; */
    left: calc(100% + 20px);
}

.additional-options ul {
    list-style: none;
    padding: 0;
}

.additional-options ul li {
    color: #5f6368;
    text-align: center;
    padding: 5px 10px;
    cursor: pointer;
    margin: 5px 0;
}

.option {
    /* flex-wrap: wrap; */
    display: flex;
    justify-content: center;
}

.eye {
    color: #5f6368;
    text-decoration: none;
    padding: 10px;
    font-size: 20px;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.3s;
}

.eye:hover {
    background: rgba(230, 230, 230, 0.4);
}

/* .additional-options ul li:not(:first-child) {
    border-top: 2px solid #d8d7d7;
} */
</style>