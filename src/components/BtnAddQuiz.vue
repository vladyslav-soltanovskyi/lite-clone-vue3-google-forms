<template>
    <div class="btn-add-quiz" @click="showModal">
        <i class="fas fa-plus"></i>

        <teleport to="body">
            <transition name="modal" mode="out-in">
                <modal
                    v-if="visibilityModal"
                    @closeModal="closeModal"
                >
                </modal>
            </transition>
        </teleport>
    </div>
</template>

<script>
import Modal from './ModalNewQuiz.vue'; 

export default {
    data: () => ({ visibilityModal: false }),
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
.btn-add-quiz {
    position: fixed;
    right: 50px;
    bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s top;
    border-radius: 50%;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
    width: 56px;
    height: 56px;
    z-index: 50;
    background-color: #fff;
    color: #5f6368;
    cursor: pointer;
}

.btn-add-quiz i {
    font-size: 25px;
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