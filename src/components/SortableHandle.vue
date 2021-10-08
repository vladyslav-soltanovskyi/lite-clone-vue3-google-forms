<template>
  <div class="handle-container" @click.stop>
    <slot></slot>
  </div>
</template>

<style scoped>
.handle-container {
  cursor: pointer;
}
</style>

<script>
  export default {
    inject: ['handleClass'],
    mounted() {
      this.$el.classList.add(this.handleClass)
    }
  }
</script>
