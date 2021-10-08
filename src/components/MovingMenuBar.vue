<template>
  <div class="menu-block" :style="currentPositionTop">
    <a href="#" class="menu-btn" :class="isActiveBtn" @click.prevent="showMenu">
      <span></span>
    </a>
    
    <nav class="menu" :class="isActiveMenu">
      <a href="#"><i class="fas fa-plus"></i></a>
      <a href="#"><i class="fas fa-cog"></i></a>
      <a href="#"><i class="fas fa-stopwatch"></i></a>
    </nav>
    
  </div>
</template>

<script>
import _ from 'lodash';

export default {
    data: () => ({
        isActive: false,
        top: document.documentElement.scrollTop + window.innerHeight - 200
    }),
    methods: {
        showMenu() {
            this.isActive = !this.isActive;
        }
    },
    computed: {
        currentPositionTop() {
            return {top: this.top + 'px'};
        },
        isActiveMenu() {
            return this.isActive ? 'menu_active' : '';
        },
        isActiveBtn() {
            return this.isActive ? 'menu-btn_active' : '';
        }
    },
    created() {
        const eventHandler = () => {
                const scrollTop = document.documentElement.scrollTop;
                const viewportHeight = window.innerHeight;
                // const totalHeight = document.documentElement.offsetHeight;
                const currentPosition = scrollTop + viewportHeight - 200;

                // if (atTheBottom) {
                //     this.$emit('at-the-bottom')
                // }
                this.top = currentPosition;
            }
        
        let delayedHandler = _.throttle(eventHandler, 100)

        window.addEventListener('scroll', delayedHandler);
    },
    
}

// $('.menu-btn').on('click', function(e) {
//   e.preventDefault();
//   $(this).toggleClass('menu-btn_active');
//   $('.menu').toggleClass('menu_active');
// });
</script>

<style>
.menu-btn {
    display: block;
    width: 50px;
    height: 50px;
    background-color: #fff;
    border-radius: 50%;
    position: relative;
    z-index: 3;
}
.menu-btn span,
.menu-btn span::before,
.menu-btn span::after {
    position: absolute;
    top: 50%; 
    margin-top: -1px;
    left: 50%; 
    margin-left: -10px;
    width: 20px;
    height: 2px;
    font-size: 24px;
    background-color: rgb(71, 70, 70);
    color: #5f6368;
}

.menu-btn span::before,
.menu-btn span::after {
    content: '';
    display: block;
    transition: 0.2s;
}
.menu-btn span::before {
    transform: translateY(-5px);
}
.menu-btn_active span {
    height: 0;
}
.menu-btn span::after {
    transform: translateY(5px);
}

.menu-btn_active span:before {
    transform: rotate(-45deg);
    transform-origin: center;
}
.menu-btn_active span:after {
    transform: rotate(45deg);
    transform-origin: center;
}

.menu-block {
    display: flex;
    justify-content: center;
    align-items: center;
}
.menu-nav {
    background-color: #fff;
    height: 50px;
}
.menu-nav__link {
    display: inline-block;
    text-decoration: none;
    color: #fff;
    margin-right: 20px;
}
.menu-nav__link {
    transition: 0.5s;
    transform-origin: right center;
    transform: translateX(50%);
    opacity: 0;
}
.menu-nav__link_active {
    transform: translateX(0%);
    opacity: 1;
}
.menu-block {
    position: absolute;
    right: -75px;
    transition: 0.5s top;
    /* bottom: 100px; */
    border-radius: 50%;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
}
.menu a {
    color: #5f6368;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid;
    transition: 0.4s;
    position: absolute;
    left: calc(50% - 20px);
    top: calc(50% - 20px);
    z-index: 0;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}
.menu a:nth-child(1) {
    transition-delay: 0.1s;
}
.menu a:nth-child(2) {
    transition-delay: 0.2s;
}
.menu a:nth-child(3) {
    transition-delay: 0.3s;
}

.menu_active a:nth-child(1) {
    top: calc(50% - 20px - 155px)
}
.menu_active a:nth-child(2) {
    top: calc(50% - 20px - 105px)
}
.menu_active a:nth-child(3) {
    top: calc(50% - 20px - 55px)
}
</style>