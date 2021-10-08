<template>
    <div class="modal">
        <div class="modal-box" v-click-outside="clickOutside">
            <slot></slot>
        </div>
    </div>
</template>


<script>
export default {
    methods: {
        clickOutside() {
            this.$emit('closeModal')
        }
    }
}
</script>

<style scoped>
.modal {
    position: fixed;
    box-sizing: border-box;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    /* display: flex;
    justify-content: center;
    align-items: center; */
    background: rgba(0, 0, 0, 0.2);
    z-index: 999;
    opacity: 1;
    z-index: 1000;
    cursor: pointer;
}

.modal-box {
    cursor: default;
    position: fixed;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 20px 60px -2px rgb(27 33 58 / 40%);
    /* width: 40%; */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* padding: 20px; */
    padding: 30px 42px;
    z-index: 1001;
}
</style>