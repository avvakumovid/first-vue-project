<template>
  <div class="post">
    <div>
      <div><strong>Название: </strong>{{ post.title }}</div>
      <div> <strong>Описание: </strong> {{ post.body }}</div>
    </div>
    <my-button @click="$router.push(`/post/${post.id}`)" class='post__btn'>Открыть</my-button>
    <my-button @click='$emit("remove", post)' class='post__btn'>Удалить</my-button>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    },

  }
}
</script>

<style scoped>
.post {
  padding: 15px;
  margin-top: 15px;
  border: 2px solid teal;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>