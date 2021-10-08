<template>
    <form-input :value="score" :type="'number'" @changeTitle="changeScore"/>
</template>

<script>
import FormInput from './FormInput.vue';
export default {
    props: {
        score: {
            type: Number,
            default: 0,
        },
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 100,
        }
    },
    methods: {
        changeScore({ value }) {
            let number = +value.replace(/\D/g, '');

            if (number < this.min) {
                number = this.min;
            } else if (number > this.max) {
                number = this.max;
            } 

            this.$emit('changeScore', number);
        }
    },
    components: {
        FormInput
    }
}
</script>