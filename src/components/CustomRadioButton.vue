<template>
    <label class="container" :class="{disabled: disabled}">
        {{ value }}
        <input type="radio" :disabled="disabled" @change="changeSelect" :checked="isCheck">
        <span class="checkmark"></span>
    </label>
</template>

<script>
export default {
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        value: {
            type: String,
            default: ''
        },
        variant: {
            default: null
        },
        isCheck: {
			type: Boolean,
            default: false
        }
    },
    methods: {
        changeSelect() {
            this.$emit('changeSelect', this.variant);
        }
    }
}
</script>

<style scoped>
.container {
    display: block;
    position: relative;
    padding-left: 25px;
    user-select: none;
}

.container input {
    position: absolute;
    opacity: 0;
}
.container:not(.disabled) input {
    cursor: pointer;
}

.checkmark {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    height: 15px;
    width: 15px;
    border: 1px solid #bdbdbd;
    background-color: #fff;
    border-radius: 50%;
}

/* .container:not(.disabled):hover input ~ .checkmark {
    background-color: #ccc;
    border: none;
} */


.container:not(.disabled) input:checked ~ .checkmark {
    background-color: #2196F3;
    border: none;
}


.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

.container input:checked ~ .checkmark:after {
    display: block;
}

.container .checkmark:after {
	top: 50%;
	left: 50%;
    transform: translate(-50%, -50%);
    width: 6px;
	height: 6px;
	border-radius: 50%;
	background: white;
}
</style>