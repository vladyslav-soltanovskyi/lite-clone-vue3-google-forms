<template>
    <nav>
        <ul>
            <li>
                <button v-if="isHome" @click="showModal">Добавить викторину</button>
            </li>
        </ul>

        <teleport to="body">
            <transition name="modal" mode="out-in">
                <modal
                    v-if="visibilityModal"
                    @closeModal="closeModal"
                >
                </modal>
            </transition>
        </teleport>
    </nav>
</template>

<script>
import Modal from './ModalNewQuiz.vue'; 

export default {
    data: () => ({ visibilityModal: false }),
    computed: {
        isHome() {
            return this.$route.name === 'Home';
        }
    },
    methods: {
        closeModal() {
            this.visibilityModal = false;
        },
        showModal() {
            this.visibilityModal = true;
        }
    },
    components: { Modal }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
    box-sizing: border-box;
}

nav {
    text-align: right;
    margin-right: 20px;
    line-height: 60px;
    position: relative;
    color: #5f6368;
    flex-grow: 1;
}

nav ul li {
    display: inline-block;
    text-align: center;
    margin: 0 7px;
    padding: 0 13px;
    position: relative;
}

/* nav ul li a {
    cursor: pointer;
    color: #5f6368;
    font-size: 18px;
    position: relative;
    transition: text-shadow 0.2s;
}

nav ul li a  {
    display: block;
}

nav ul li a:hover {
    text-shadow: 0 0 20px #ede7f6;
}

nav ul li a.active {
    text-shadow: 0 0 20px #ede7f6;
} */

button {
    background: #673ab7;
    color: #fff;
    padding: 10px 15px;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    border: none;
    transition: all .15s;
}

button:hover {
    background: #7349bb;
}

button:active {
    opacity: 0.4;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}

.modal-enter-active{
    animation: show 0.2s;
}

.modal-leave-active{
    animation: hide 0.2s;
}

@keyframes show{
    from {opacity: 0;}
    to {opacity: 1;}
}

@keyframes hide{
    from {opacity: 1;}
    to {opacity: 0;}
}


</style>