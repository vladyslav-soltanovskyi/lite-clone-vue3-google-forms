<template>
    <div>
        <ResponseItem v-for="(response, index) in responses" :response="response" :index="index" :key="response.id" />
    </div>
</template>

<script>
import ResponseItem from './ResponseItem.vue';
export default {
    props: ['responses'],
    components: {
        ResponseItem
    }
}
</script>