<template>
    <component :is="layout">
        <router-view></router-view>
    </component>
</template>

<script>
import MainLayout from './layouts/MainLayout.vue';
import AuthLayout from './layouts/AuthLayout.vue';
import QuizEditLayout from './layouts/QuizEditLayout.vue';

export default {
    computed: {
        layout() {
            return (this.$route.meta.layout || 'auth') + '-layout';
        }
    },
    components: { MainLayout, AuthLayout, QuizEditLayout }
}
</script>

<style>
body {
    padding: 0;
    margin: 0;
}
</style>
