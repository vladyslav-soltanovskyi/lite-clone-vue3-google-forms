<template>
    <header class="header">
        <div class="container">
            <router-link to="/" class="logo">VueForms</router-link>
            <DropdownMenu />
        </div>
        <div class="tabs-container">
            <div class="tabs">
                <div class="tab" @click="setTab('')" :class="isSelected('')">
                    Вопросы
                    <div class="bottom-line"></div>
                </div>
                <div class="tab" @click="setTab('responses-page')" :class="isSelected('responses-page')">
                    Ответы
                    <span class="score-response" v-if="sizeOfResponses">{{ sizeOfResponses }}</span>
                    <div class="bottom-line"></div>
                </div>
            </div>
            <CountScore />
        </div>
    </header>
</template>

<script>
import { mapGetters } from 'vuex';
import DropdownMenu from '@/components/DropdownMenu.vue';
import CountScore from '@/components/CountScore.vue';
export default {
    computed: {
        ...mapGetters('currentBlock', ['tab']),
        ...mapGetters('responses', ['sizeOfResponses'])
    },
    methods: {
        setTab(tab) {
            let hash = !tab ? '' : `#${tab}` ;
            this.$store.commit('currentBlock/setTab', tab);
            this.$router.push({ hash });
        },
        isSelected(tab) {
            return {
                selected: tab === this.tab
            }
        }
    },
    components: {
        DropdownMenu, CountScore
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

.tabs-container {
    max-width: 700px;
    margin: 0 auto;
    position: relative;
}

.tabs {
    display: flex;
    width: 100%;
    justify-content: center;
}

.tab {
    padding: 0 12px;
    color: #3C4043;
    line-height: 36px;
    font-size: 14px;
    font-weight: 500;
    position: relative;
    box-sizing: border-box;
    cursor: pointer;
}

.tab .bottom-line {
    width: 100%;
    height: 3px;
    background: rgb(103, 58, 183);
    position: absolute;
    left: 0;
    bottom: 0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    opacity: 0;
}

.tab.selected {
    color: #673ab7;
}

.tab.selected .bottom-line {
    opacity: 1;
}

.score-response {
    color: #ffffff;
    background-color: #673ab7;
    border-radius: 100px;
    margin-left: 5px;
    font-size: 14px;
    width: auto;
    padding: 3px 6px;
}
</style>