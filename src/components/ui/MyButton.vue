<template>
  <button class='btn'>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'my-button'
}
</script>

<style scoped>
.btn {
  border: 1px solid teal;
  color: teal;
  padding: 5px 15px;
  background-color: transparent;
}
</style>