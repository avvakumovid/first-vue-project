<template>
  <div v-if='posts.length > 0'>
    <h3>Список постов</h3>
    <transition-group name='post-list'>
      <post v-for='post in posts' @remove='$emit("remove", post)' :post='post' :key='post.id' />
    </transition-group>

  </div>
  <h2 v-else>Список постов пустой!</h2>
</template>

<script>
import Post from "./Post.vue"

export default {
  components: { Post },
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.4s ease;
}

.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}

.post-list-move {
  transition: all 0.8s ease;
}
</style>