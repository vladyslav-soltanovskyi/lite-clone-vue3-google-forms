<template>
    <div>
        <preloader v-if="isLoadingFromQuizzes || isLoadingFromQuiz"></preloader>
        <HeaderForQuizEditPage />
        <main>
            <slot  />
        </main>
    </div>
</template>

<style>
body {
    background: rgb(209, 218, 230);
    font-family: -apple-system,BlinkMacSystemFont,'Roboto','Helvetica Neue',Geneva,"Noto Sans Armenian","Noto Sans Bengali","Noto Sans Cherokee","Noto Sans Devanagari","Noto Sans Ethiopic","Noto Sans Georgian","Noto Sans Hebrew","Noto Sans Kannada","Noto Sans Khmer","Noto Sans Lao","Noto Sans Osmanya","Noto Sans Tamil","Noto Sans Telugu","Noto Sans Thai",sans-serif,arial,Tahoma,verdana;
}

main {
    padding-top: 60px;
}
</style>


<script>
import { mapGetters } from 'vuex';
import HeaderForQuizEditPage from '@/views/HeaderForQuizEditPage.vue';
import Preloader from '@/components/Preloader.vue';
export default {
    computed: {
        ...mapGetters('quizzes', {
            isLoadingFromQuizzes: 'isLoading'
        }),
        ...mapGetters('quiz', {
            isLoadingFromQuiz:'isLoading'
        })
    },
    components: {
        HeaderForQuizEditPage,
        Preloader
    }
}
</script>