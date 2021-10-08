<template>
  <div class="itemClass">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    inject: ['itemClass'],
    mounted() {
      this.$el.classList.add(this.itemClass)
    }
  }
</script>
