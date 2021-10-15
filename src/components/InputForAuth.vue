<template>
    <div class="form_group">
        <div class="container-form">
            <input class="form_input" 
                :type="changeTypeInput"
                placeholder=" "
                :value="value"
                @input="changeValue"
                ref="input"
                :class="isInvalide"
                >
            <label 
                class="form_label"
                :class="isInvalide"
                @click="focusInput">{{ title }}</label>
            <i class="fas eye"
                v-if="type === 'password'"
                :class="changeClassEye"
                @click="toggleHide"></i>
        </div>
        <div class="errors" v-if="errorMessages">
            <p class="error-info" v-for="(error, index) in errorMessages" :key="index"><i class="fas fa-times-circle"></i> {{ error }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            default: ''
        },
        title: {
            default: ''
        },
        type: {
            default: null
        },
        name: {
            default: ''
        },
        errorMessages: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data: () => ({
        isHide: false
    }),
    computed: {
        changeTypeInput() {
            return (!(this.isHide) && (this.type && this.type === 'password')) ? 'password' : 'text';
        },
        changeClassEye() {
            return !(this.isHide) ? 'fa-eye' : 'fa-eye-slash';
        },
        isInvalide() {
            return { error: this.errorMessages.length };
        }
    },
    methods: {
        toggleHide() {
            this.isHide = !this.isHide;
        },
        changeValue(event) {
            this.$emit('changeValue', {
                name: this.name,
                value: event.target.value
            })
        },
        focusInput() {
            this.$refs.input.focus();
        }
    }
}
</script>

<style scoped>
.form_group {
    position: relative;
}

.container-form {
    position: relative;
}

.eye {
    position: absolute;
    opacity: 0;
    visibility: hidden;
    top: 50%;
    cursor: pointer;
    font-size: 17px;
    right: 10px;
    transform: translateY(-50%);
    color: #bdbdbd;
    z-index: 5;
}

.form_input {
    font-family: sans-serif;
    letter-spacing: 1px;
    font-size: 16px;
}

.form_label {
    font-weight: normal;
    color: #5f6368;
    position: absolute;
    top: 50%;
    left: 13px;
    transform: translateY(-50%);
    font-size: 14px;
    transition: 0.15s all;
    background-color: #fff;
    padding: 0 5px;
}

.form_input {
    width: 100%;
    padding: 13px 15px;
    border: 1px solid #b1b1b1;
    outline: none;
    background-color: transparent;
    transition: 0.15s all;
    color: #202124;
    border-radius: 5px;
    margin: 8px 0;
    font-size: 14px;
    letter-spacing: 1px;
    font-weight: 300;
    box-sizing: border-box;
}

.form_input:focus {
    border: 1px solid #1a73e8;
}

.form_input.error {
    border: 1px solid #d93025;
}

.form_button {
    padding: 10px 22px;
    background: #0071f0;
    border: none;
    outline: none;
    color: #fff;
    border-radius: 5px;
    transition: 0.15s all;
    position: relative;
    overflow: hidden;
}

.error-info {
    font-size: 12px;
    color: #d93025;
    padding: 0;
    margin: 5px 0;
}

.form_input:focus~.form_label,
.form_input:not(:placeholder-shown)~.form_label {
    left: 0px;
    transform: scale(0.75) translateY(-42px);
    color: #1a73e8;
}

.form_input:hover {
    background: rgb(252, 252, 252);
}

.form_input:hover~.eye,
.eye:hover,
.form_label:hover~.eye {
    opacity: 1;
    visibility: visible;
}

.form_label.error { 
    color: #d93025 !important;
}
</style>