import axios from 'axios';
import { ref, onMounted } from 'vue';

export const usePosts = limit => {
  const posts = ref([]);
  const isPostsLoading = ref(false);
  const page = ref(1);
  const totalPages = ref(0);
  const fetchPost = async () => {
    try {
      isPostsLoading.value = true;
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts',
        {
          params: {
            _limit: limit,
            _page: page.value,
          },
        }
      );
      posts.value = response.data;
      isPostsLoading.value = false;
      totalPages.value = Math.ceil(response.headers['x-total-count'] / limit);
    } catch (error) {
      alert('Error', error.message);
    }
  };

  onMounted(fetchPost);

  return {
    posts,
    isPostsLoading,
    page,
    totalPages,
  };
};
