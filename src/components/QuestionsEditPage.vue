<template>
    <QuizTitleEdit />
    <QuestionsEditList />
</template>

<script>
import QuizTitleEdit from '@/components/QuizTitleEdit.vue';
import QuestionsEditList from '@/components/QuestionsEditList.vue';
export default {
    components: {
        QuestionsEditList, QuizTitleEdit
    }
}
</script>