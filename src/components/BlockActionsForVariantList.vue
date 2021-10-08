<template>
    <div class="block-actions">
        <p><span class="answer" @click.stop="editQuestion({ id: question.id, isEdit: !question.isEdit })">Ответы</span> ({{genitive(question.score)}})</p>
        <i @click.stop="deleteQuestion(question)" class="far fa-trash-alt"></i>
    </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
    props: ['question'],
    methods: {
        ...mapActions('questions', {
            deleteQuestion: 'delete'
        }),
        ...mapMutations('questions', {
            editQuestion: 'edit'
        }),
        genitive(n) {
            let word = {singular: 'балл', many1: 'балла', many2: 'баллов'};
            let res = word.many2;
            if(n % 100 < 5 || n % 100 > 20) {
                if( n % 10 == 1) {
                    res = word.singular;
                }
                if( n % 10 > 1 && n % 10 < 5) {
                    res = word.many1; 
                }
            }
            return `${n} ${res}`;
        },
    }
}
</script>

<style scoped>

.block-actions {
    margin-top: 30px;
    padding: 15px 15px 0 15px;
    border-top: 1px solid #dadce0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.answer {
    color: #1a73e8;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
}

.answer:hover {
    background: rgba(235, 239, 255, 0.6);
}

i {
    padding: 15px;
    font-size: 20px;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.3s;
}

i:hover {
    background: rgba(230, 230, 230, 0.4);
}
</style>