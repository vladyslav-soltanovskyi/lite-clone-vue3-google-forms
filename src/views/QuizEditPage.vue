<template>
    <keep-alive>
        <component :is="activeTab"></component>
    </keep-alive>
</template>

<script>
import QuestionsEditPage from '@/components/QuestionsEditPage.vue';
import ResponsesPage from '@/components/ResponsesPage.vue';
export default {
    computed: {
        activeTab() {
            let tab = this.$store.getters['currentBlock/tab'];
            return !tab ? 'questions-edit-page': tab;
        }
    },
    components: {
        ResponsesPage, QuestionsEditPage
    }
}
</script>