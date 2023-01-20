<template>
  <div>
    <h1>{{ $store.state.isAuth ? "Пользователь авторизован" : "Пользователь не автроизован" }}</h1>
    <h1>{{ $store.state.likes }}</h1>
    <h1>{{ $store.state.post.search }}</h1>
    <div class='app-btns'>
      <my-button @click='$store.commit("incrementLikes")'>Like</my-button>
      <my-button @click='$store.commit("decrementLikes")'>DisLike</my-button>
    </div>
    <h1>Страница с постами</h1>
    <my-input v-focus style="width: 100%" :value='search' @update:value='setSearch' />
    <div class='app-btns'>
      <my-button @click='toggleDialog'>Новый пост</my-button>
      <my-select :model-value='selected' @update:model-value='setSelected' :options='options' />
    </div>
    <post-list v-if='!isPostsLoading' @remove='removePost' :posts='sortedAndSearchPosts' />
    <div v-else>Loading...</div>
    <div class='observer' v-intersection='loadMorePage'></div>
    <my-paginator v-model='page' :pages='totalPages' />
    <my-dialog v-model:show='show'> <post-form @create='createPost' /></my-dialog>
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
export default {
  components: {
    PostList, PostForm
  },
  data() {
    return {
      show: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearch: 'post/setSearch',
      setSelected: 'post/setSelected'
    }),
    ...mapActions({
      loadMorePage: 'post/loadMorePage',
      fetchPosts: 'post/fetchPosts'
    }),
    createPost(post) {
      this.posts.unshift(post)
      this.show = false
    },
    removePost(post) {
      //const index = this.posts.findIndex(p => post.id == p.id)
      // this.posts.splice(index, 1)
      this.posts = this.posts.filter(p => p.id != post.id)
    },
    toggleDialog(e) {
      e.preventDefault();
      this.show = !this.show
    },
    select(value) {
      this.selected = value
    }
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      selected: state => state.post.selected,
      search: state => state.post.search,
      page: state => state.post.page,
      totalPages: state => state.post.totalPages,
      limit: state => state.post.limit,
      options: state => state.post.options
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchPosts: 'post/sortedAndSearchPosts'
    })
  },
  watch: {

  }
}
</script>

<style>
.app-btns {
  display: flex;
  margin: 10px 0;
  justify-content: space-between;
}

.observer {
  width: 100%;
  height: 30px;
}
</style>