<template>
  <nav class='navbar'>
    <h2 @click='$router.push("/")'>Vue 3</h2>
    <div class="bnts">
      <my-button @click='$router.push("/")'>Главная</my-button>
      <my-button @click='$router.push("/posts")'>Посты</my-button>
      <my-button @click='$router.push("/store")'>Посты из стора</my-button>
      <my-button @click='$router.push("/about")'>Обомне</my-button>
      <my-button @click='$router.push("/composition")'>Композишн Апи</my-button>
    </div>
  </nav>
</template>

<script>
export default {

}
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: rgb(211, 252, 252);
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 0 20px;
  width: 100%;
}

.bnts {
  column-gap: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>