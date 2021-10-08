<template>
    <div class="block-actions">
        <span class="answer" @click.stop="editQuestion({ id: question.id, isEdit: !question.isEdit })">Готово</span>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    props: ['question'],
    methods: {
        ...mapMutations('questions', {
            editQuestion: 'edit'
        }),
    }
}
</script>

<style scoped>

.block-actions {
    margin-top: 30px;
    padding: 15px 15px 0 15px;
    border-top: 1px solid #dadce0;
    display: flex;
    justify-content: flex-end;
}

.answer {
    color: #1a73e8;
    padding: 10px 15px;
    border-radius: 5px;
    border: 1px #dadce0 solid;
    cursor: pointer;
    transition: background 0.3s;
}

.answer:hover {
    background: rgba(235, 239, 255, 0.6);
}
/* f8faff */

</style>