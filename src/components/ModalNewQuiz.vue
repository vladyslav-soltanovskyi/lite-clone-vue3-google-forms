<template>
    <modal>
        <div class="header">
            <h1 class="header-title">Новая викторина</h1>
        </div>
        <form @submit.prevent="addQuiz">
            <div class="form-group">
                <label class="form-label">Заголовок:</label>
                <div class="form-input">
                    <input type="text" class="input" v-model="quiz.title">
                </div>
            </div>
            <div class="form-group">
                <label class="form-label">Описание:</label>
                <div class="form-input">
                    <input type="text" class="input" v-model="quiz.description">
                </div>
            </div>
            <div class="form-group">
                <label class="form-label">Изображение викторины:</label>
                <div class="form-input">
                    <!-- <input type="text" class="input"> -->
                    <ImageUploader v-model="quiz.image" />
                </div>
            </div>
            <div class="modal-dialog-buttons">
                <button type="submit" class="btn-accept">ОК</button>
                <button type="button" @click="$emit('closeModal')" class="btn-cancle">Отмена</button>
            </div>
        </form>
    </modal>
</template>

<script>
import { mapActions } from 'vuex';
import Modal from './Modal.vue';
import ImageUploader from './ImageUploader.vue';
export default {
    data: () => ({ 
        quiz: {
            id: Date.now(),
            title: '',
            description: '',
            image: null
        }
    }),
    methods: {
        ...mapActions('quizzes', ['add']),
        addQuiz() {
            this.$store.dispatch('quizzes/add', this.quiz);
            this.$emit('closeModal');
        }
    },
    components: { Modal, ImageUploader }
}
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
}

.header-title {
    color: #202124;
    /* font-family: "Google Sans",Roboto,Arial,sans-serif; */
    font-size: 22px;
    font-weight: 400;
    line-height: 24px;
    margin: 0 0 16px;
}

.form-group {
    color: #5f6368;
    font-size: 16px;
    font-weight: 400;
    margin: 10px 0;
    width: 340px;
}

.form-label {
    line-height: 1.4em;
}

.input {
    border-radius: 4px;
    border: 1px solid #9aa0a6;
    border-top: 1px solid #c0c0c0;
    font-size: 13px;
    height: 25px;
    padding: 1px 8px;
    width: 25em;
}

.form-input {
    margin-top: 10px;
}

.input:focus {
    outline: none;
    border: 1px solid #673ab7;
}

.modal-dialog-buttons {
    display: flex;
    flex-direction: row-reverse;
}

.btn-accept {
    cursor: pointer;
    margin: 0 0 0 16px;
    min-width: 85px;
    font-weight: 500;
    background-color: #4d90fe;
    background-image: -webkit-linear-gradient(top,#4d90fe,#4787ed);
    color: #fff;
    outline: 0;
    border: 1px solid transparent!important;
    border-radius: 4px;
    box-shadow: none;
    box-sizing: border-box;
    font-size: 14px;
    height: 36px;
    letter-spacing: 0.25px;
    line-height: 16px;
    padding: 9px 24px 11px 24px;
    /* background: #8430ce; */
    text-transform: uppercase;
}

.btn-cancle {
    cursor: pointer;
    margin: 0 0 0 16px;
    min-width: 85px;
    border-radius: 4px;
    box-shadow: none;
    box-sizing: border-box;
    font-weight: 500;
    font-size: 14px;
    height: 36px;
    letter-spacing: 0.25px;
    line-height: 16px;
    padding: 9px 24px 11px 24px;
    background: white;
    border: 1px solid #dadce0!important;
    color: #8430ce;
    outline: 0;
}
</style>