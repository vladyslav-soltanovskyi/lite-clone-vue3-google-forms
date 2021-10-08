<template>
    <label class="container" :class="{disabled: disabled}">
        {{ value }}
        <input type="checkbox" :disabled="disabled"  @change="changeSelect" :checked="isCheck">
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
* {
    box-sizing: border-box;
}

.container {
	display: block;
	position: relative;
	padding-left: 25px;
	cursor: pointer;
	user-select: none;
}

.container input {
	position: absolute;
	opacity: 0;
	height: 0;
	width: 0;
}
.container:not(.disabled) input {
	cursor: pointer;
}

.checkmark {
	position: absolute;
	top: 0;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	height: 15px;
	width: 15px;
	border-radius: 2px;
	border: 1px solid #bdbdbd;
	background-color: #fff;
}

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
	left: 4px;
	top: 0px;
	width: 4px;
	height: 8px;
	border: solid white;
	border-width: 0 3px 3px 0;
	transform: rotate(45deg);
}
</style>