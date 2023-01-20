import { ref, computed } from 'vue';

export const useSortedAndFindPosts = sortedPosts => {
  const search = ref('');
  const sortedAndSearchPosts = computed(() => {
    const regex = new RegExp(search.value, 'i');
    return sortedPosts.value.filter(post => regex.test(post.title));
  });

  return {
    search,
    sortedAndSearchPosts,
  };
};
