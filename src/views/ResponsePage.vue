<template>
    <template v-if="response">
        <QuizTitleResponse :response="response"  />
        <QuestionsResponseList :questions="response.questions" />
    </template>
</template>

<script>
import { mapGetters } from 'vuex';
import QuizTitleResponse from '@/components/QuizTitleResponse.vue';
import QuestionsResponseList from '@/components/QuestionsResponseList.vue';
export default {
    computed: {
        ...mapGetters('response', ['response'])
    },
    components: {
        QuestionsResponseList, QuizTitleResponse
    }
}
</script>