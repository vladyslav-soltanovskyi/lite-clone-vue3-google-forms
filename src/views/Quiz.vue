<template>
    <QuizTitleView />
    <QuestionsViewList />
</template>

<script>
import QuizTitleView from '@/components/QuizTitleView.vue';
import QuestionsViewList from '@/components/QuestionsViewList.vue';
export default {
    components: {
        QuestionsViewList, QuizTitleView
    }
}
</script>