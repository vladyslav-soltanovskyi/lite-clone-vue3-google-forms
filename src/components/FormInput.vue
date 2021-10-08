<template>
    <label class="form-group">
        <input
            class="answer"
            @focus="focus"
            @blur="blur"
            :value="value"
            :type="type"
            :class="color"
            :disabled="disabled"
            @change="changeTitle($event)"
            :style="{fontSize: size + 'px'}"
            :placeholder="placeholder"
            >
        <span class="bottom-line" :class="{ active: isSelect }"></span>
    </label>
</template>


<script>
export default {
    props: {
        value: {
            default: ''
        },
        id: {
            type: Number,
            default: 0
        },
        size: {
            type: Number,
            default: 14
        },
        placeholder: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        color: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        isSelect: false
    }),
    methods: {
        focus() {
            this.isSelect = true;
            this.$emit('focused');
        },
        blur() {
            this.isSelect = false;
        },
        changeTitle(event) {
            let obj = {
                id: this.id,
                value: event.target.value
            }
            this.$emit('changeTitle', obj)
        }
    }
}
</script>


<style scoped>
.form-group {
    flex-grow: 1;
    margin: 0 5px;
    position: relative;
    background: transparent;
    /* height: 100%; */
}

.answer {
    border: none;
    width: 100%;
    outline: none;
    border-bottom: 1px solid #cfcdcd; /* f1f1f1 */
    font-size: 16px;
    padding: 7px;
    box-sizing: border-box;
}

.answer:disabled {
    border-bottom: 1px dotted #cfcdcd;
}

.answer.title {
    padding: 12px;
    background: #f8f9fa;
}

/* .answer:focus {
    background-color: rgb(238, 237, 237);
} */

.bottom-line {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    background: #8e44ad;
    left: 50%;
    z-index: 20;
}

.bottom-line.active {
    animation: 0.7s progress forwards;
}

@keyframes progress {
    from {
        left: 50%;
        width: 0;
    }

    to {
        left: 0;
        width: 100%;
    }
}
</style>