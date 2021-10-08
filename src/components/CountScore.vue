<template>
    <div>
        <p>Всего: {{ totalScore }}</p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters('questions', ['totalScore'])
    }
}
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family:  'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
p {
    font-size: 15px;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    position: absolute;
    padding: 5px 0;
    color: #70757a;
}

div {
    width: 700px;
    margin: 0 auto;
}
</style>