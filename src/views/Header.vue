<template>
    <header class="header">
        <div class="container">
            <router-link to="/" class="logo">VueForms</router-link>
            <DropdownMenu />
        </div>
    </header>
</template>

<script>
import DropdownMenu from '@/components/DropdownMenu.vue';
export default {
    components: {
        DropdownMenu
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
    box-sizing: border-box;
}

.logo {
    line-height: 60px;
    font-size: 22px;
}

.header {
    position: fixed;
    width: 100%;
    min-height: 60px;
    background: #ffffff;
    z-index: 20;
    left: 0;
    top: 0;
}

.container {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>