<template>
  <div>
    <my-input v-focus style="width: 100%" v-model:value='search' />
    <div class='app-btns'>
      <my-button @click='toggleDialog'>Новый пост</my-button>
      <my-select v-model='selected' :options='options' />
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
import axios from 'axios';
export default {
  components: {
    PostList, PostForm
  },
  data() {
    return {
      posts: [
      ],
      show: false,
      isPostsLoading: false,
      selected: '',
      search: '',
      page: 1,
      totalPages: 0,
      limit: 10,
      options: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По описанию' },
        { value: 'id', name: 'По id' },
      ]
    }
  },
  methods: {
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
    async fetchPosts() {
      try {
        this.isPostsLoading = true
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _limit: this.limit,
            _page: this.page
          }
        })
        this.posts = response.data
        this.isPostsLoading = false
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
      } catch (error) {
        alert('Error', error.message)
      }
    },
    async loadMorePage() {
      try {
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _limit: this.limit,
            _page: this.page
          }
        })
        this.posts = [...this.posts, ...response.data]
      } catch (error) {
        alert('Error', error.message)
      }
    },
    select(value) {
      this.selected = value
    }


  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        if (post1[this.selected] > post2[this.selected]) {
          return 1;
        }
        if (post1[this.selected] < post2[this.selected]) {
          return -1;
        }
        return 0
      })
    },
    sortedAndSearchPosts() {
      const regex = new RegExp(this.search, 'i')
      return this.sortedPosts.filter(post => regex.test(post.title))
    }
  },
  watch: {
    //selected(newValue) {
    //    //  this.posts.sort((post1, post2) => {
    //    //      return post1[newValue]?.localeCompare(post2[newValue])
    //    //  })
    //    this.posts.sort((post1, post2) => {
    //        if (post1[newValue] > post2[newValue]) {
    //            return 1;
    //        }
    //        if (post1[newValue] < post2[newValue]) {
    //            return -1;
    //        }
    //        return 0
    //    })
    //},
    page() {
      if (this.posts == 0) {
        this.fetchPosts()
      }
    }
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