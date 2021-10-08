<template>
    <div class="select-box">
        <transition name="slide" mode="out-in">
            <div class="options-container"
                v-if="isVisible"
                v-click-away="hideVIsibility">
                <div class="option"
                    v-for="option in options"
                    :key="option.type"
                    :class="{active: selected.type === option.type}"
                    @click="changeSelect(option)">
                    <label>{{ option.name }}</label>
                </div>
            </div>
        </transition>

        <div class="selected" @click="toggleVisibility">
            {{ selected.name }}
            <i class="fas fa-angle-down"></i>
        </div>
    </div>
</template>

<script>
export default {
    props: ['id', 'value'],
    data: () => ({
        isVisible: false,
        options: [
            { name: "Один из списка", type: "radio"},
            { name: "Несколько из списка", type: "checkbox"},
            { name: "Текст (строка)", type: "input"}
        ],
        selected: null
    }),
    created() {
        this.selected = this.options.find(option => option.type === this.value);
        // this.options.forEach(option => {
        //     if(option.type === value) {

        //     }
        // });
        // this.selected = this.options[0];
    },
    computed: {
        isShowOptions() {
            return { active: this.isVisible};
        }
    },
    methods: {
        toggleVisibility() {
            this.isVisible = !this.isVisible;
        },
        hideVIsibility() {
            this.isVisible = false;
        },
        changeSelect(option) {
            this.selected = option;
            this.hideVIsibility();
            this.$emit('chagneType', {
                id: this.id,
                type: this.selected.type 
            });
        }
    }
}
</script>

<style scoped>
*:not(i) {
    margin: 0;
    box-sizing: border-box;
    font-weight: 400;
}

h2 {
    margin: 16px;
}

.container {
    margin-top: 100px;
    padding: 32px;
}

.select-box {
    display: flex;
    width: 250px;
    flex-direction: column;
    position: relative;
}

.select-box .options-container {
    border: 1px solid #dadce0;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.18);
    color: #202124;
    width: 100%;
    top: 100%;
    max-height: 200px;
    transition: all 0.4s;
    border-radius: 8px;
    overflow-y: auto;
    order: 1;
    position: absolute;
    z-index: 100;
}

.selected {
    border: 1px solid #dadce0;
    background: transparent;
    border-radius: 8px;
    margin-bottom: 8px;
    color: #202124;
    position: relative;
    order: 0;
}

.selected i {
    position: absolute;
    width: 32px;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
    color: #a7a7a7;
    transition: all 0.4s;
}


.select-box .options-container.active + .selected::after {
    transform: rotateX(180deg);
    top: -6px;
}

.select-box .options-container::-webkit-scrollbar {
    width: 8px;
    background: transparent;
    border-radius: 0 8px 8px 0;
}

.select-box .options-container::-webkit-scrollbar-thumb {
    background-color: #eeeeee;
    border-radius: 0 8px 8px 0;
}

.select-box .option,
.selected {
    padding: 12px 24px;
    cursor: pointer;
}


.select-box .option.active {
    background: rgba(26,115,232,0.078);
}

.select-box .option:hover:not(.option.active) {
    background-color: #eeeeee;
}

.select-box .option.active:hover {
    background: rgba(26,115,232,0.039);
}

.select-box label {
    cursor: pointer;
}

.select-box .option .radio {
    display: none;
}




.slide-enter-active{
    animation: show 0.4s;
}

.slide-leave-active{
    animation: hide 0.4s;
}

@keyframes show{
    from {
        max-height: 0;
        opacity: 0;
    }
    to {
        max-height: 240px;
        opacity: 1;
    }
}

@keyframes hide{
    from {
        max-height: 240px;
        opacity: 1;
    }
    to {
        max-height: 0;
        opacity: 0;
    }
}
</style>