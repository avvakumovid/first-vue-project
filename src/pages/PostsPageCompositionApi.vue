<template>
  <div>

    <my-input v-focus style="width: 100%" v-model:value='search' />
    <div class='app-btns'>
      <my-select v-model='selected' :options='options' />
    </div>
    <post-list v-if='!isPostsLoading' :posts='sortedAndSearchPosts' />
    <div v-else>Loading...</div>
    <my-dialog v-model:show='show'> <post-form /></my-dialog>
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import { usePosts } from '@/hooks/usePosts'
import { useSortedAndFindPosts } from '@/hooks/useSortedAndFindPosts'
import { useSortedPosts } from '@/hooks/useSortedPosts'
export default {
  components: {
    PostList, PostForm
  },
  data() {
    return {
      show: false,
      options: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По описанию' },
        { value: 'id', name: 'По id' },
      ]
    }
  },
  setup(props) {
    const { posts,
      isPostsLoading,
      page,
      totalPages
    } = usePosts();

    const { selected, sortedPosts } = useSortedPosts(posts)
    const { search, sortedAndSearchPosts } = useSortedAndFindPosts(sortedPosts)

    return {
      isPostsLoading,
      page,
      totalPages,
      selected,
      search,
      sortedPosts,
      sortedAndSearchPosts

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