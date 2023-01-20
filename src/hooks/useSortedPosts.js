import { ref, computed } from 'vue';

export const useSortedPosts = posts => {
  const selected = ref('');
  const sortedPosts = computed(() => {
    return [...posts.value].sort((post1, post2) => {
      if (post1[selected.value] > post2[selected.value]) {
        return 1;
      }
      if (post1[selected.value] < post2[selected.value]) {
        return -1;
      }
      return 0;
    });
  });

  return {
    selected,
    sortedPosts,
  };
};
