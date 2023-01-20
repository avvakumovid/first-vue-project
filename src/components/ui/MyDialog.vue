<template>
  <div @click='hideDialog' v-if='show' class="wrapper">
    <div @click.stop class='dialog'>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import toggleMixin from '@/mixins/toggleMixin'
export default {
  name: 'my-dialog',
  mixins: [toggleMixin]
}
</script>

<style scoped>
.wrapper {

  position: absolute;
  z-index: 10;
  margin: auto;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(000, 000, 000, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;

}

.dialog {
  width: 300px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;

}
</style>