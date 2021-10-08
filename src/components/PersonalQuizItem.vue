<template>
    <div class="quiz-item">
        <div class="quiz-header-thumb" @click="redirectToQuiz">
            <img :src="quiz.image ? quiz.image : 'https://picsum.photos/400'" alt="quiz">
        </div>

        <div class="quiz-item-content">

            <div class="more-box-info">
                <i class="fas fa-ellipsis-v dots" @click="toggleDropMenu"></i>
                <transition name="dropdown-menu">
                    <div class="dropdown-menu" @click.stop v-click-outside="hideDropMenu" v-if="isVisibility">
                        <router-link class="menu-item" :to="`/quiz/${quiz.id}`">Подробнее</router-link>
                        <div class="menu-item" @click.stop="showModal">Редактировать</div>
                        <div class="menu-item" @click="deleteQuiz(quiz.id)">Удалить</div>
                    </div>
                </transition>
            </div>
            <div class="quiz-item-main" @click="redirectToQuiz">
                <div class="quiz-item-info">
                    <span class="quiz-title">{{ quiz.title }}</span>
                    <p class="quiz-date">{{ convertDate(quiz.updated_at) }}</p>
                    <!-- 15 сент. 2021 г. -->
                </div>
            </div>
        </div>

        <teleport to="body">
            <transition name="modal" mode="out-in">
                <ModalQuizEdit
                    v-if="visibilityModal"
                    @closeModal="closeModal"
                    :quizData="quiz"
                >
                </ModalQuizEdit>
            </transition>
        </teleport>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import ModalQuizEdit from './ModalQuizEdit.vue'; 

export default {
    props: ['quiz'],
    data: () => ({ isVisibility: false, visibilityModal: false }),
    methods: {
        showDropMenu() {
            this.isVisibility = true;
        },
        hideDropMenu() {
            this.isVisibility = false;
        },
        toggleDropMenu() {
            this.isVisibility = !this.isVisibility;
        },
        convertDate(date) {
            let d = new Date(date);
            let year = d.getFullYear();
            let month = d.getMonth() + 1;
            let day = d.getDate();
            let str = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
            return str;
        },
        closeModal() {
            this.visibilityModal = false;
        },
        showModal() {
            this.visibilityModal = true;
        },
        redirectToQuiz() {
            this.$router.push(`/quiz/${this.quiz.id}/edit`);
        },
        ...mapActions('quizzes', {
            deleteQuiz: 'delete'
        })
    },
    components: { ModalQuizEdit }
}
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

.quiz-item {
    max-width: 200px;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #e6ecf5;
    margin: 0 10px 25px 10px;
    cursor: pointer;
}

.quiz-item:hover {
    border: 1px solid #673ab7;
}

.quiz-header-thumb {
    border-bottom: 1px solid #d3d7df;
    overflow: hidden;
    height: 170px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.quiz-header-thumb img {
    width: 100%;
    display: block;
    height: auto;
}

.quiz-item-content {
    position: relative;
}

.quiz-title {
    text-decoration: none;
    margin-bottom: .5rem;
    font-weight: 700;
    line-height: 1.3;
    color: #414549;
    font-size: 14px;
    transition: 0.15s all;
}

.quiz-date {
    font-size: .812rem;
    font-weight: 400;
    line-height: 1.5;
    color: #8d91ab;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    right: -100%;
    /* width: 190px; */
    box-shadow: 0 0 34px 0 rgba(63, 66, 87 , 0.5);
    background-color: #fff;
    border-radius: 4px;
    text-align: left;
    padding: 15px 25px 15px 25px;
    z-index: 5;
    list-style: none;
}

.dropdown-menu .menu-item {
    text-decoration: none;
    padding: 7px 0;
    font-size: 12px;
    color: #515365;
    display: block;
    font-weight: 700;
    transition: all .15s ease;
}

.dropdown-menu .menu-item:hover {
    color: #ff5e3a;
    background-color: transparent;
}

.dots {
    transition: all .3s ease;
    padding: 10px 15px;
    border-radius: 50%;
    cursor: pointer;
}

.dots:hover {
    background: rgba(230, 230, 230, 0.4);
}

.quiz-item-main {
    padding: 16px 8px 14px 16px;
}

.more-box-info {
    position: absolute;
    right: 8px;
    bottom: 8px;
}

/* .more-box-info:hover .dropdown-menu {
    visibility: visible;
    opacity: 1;
} */

.dropdown-menu-enter-active {
    animation: show 0.1s;
}

.dropdown-menu-leave-active {
    animation: hide 0.1s;
}

@keyframes show {
    from {opacity: 0;}
    to {opacity: 1;}
}

@keyframes hide {
    from {opacity: 1;}
    to {opacity: 0;}
}


</style>