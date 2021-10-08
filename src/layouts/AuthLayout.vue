<template>
    <keep-alive>
        <transition name="slide" mode="out-in">
            <slot></slot>
        </transition>
    </keep-alive>
</template>


<style>
.slide-enter-active{
    animation: show 0.5s;
}

.slide-leave-active{
    animation: hide 0.5s;
}

@keyframes show{
    from {opacity: 0;}
    to {opacity: 1;}
}

@keyframes hide{
    from {opacity: 1;}
    to {opacity: 0;}
}
</style>