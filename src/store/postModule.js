import axios from 'axios';
export const postModule = {
  state: () => ({
    posts: [],
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
    ],
  }),
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) => {
        if (post1[state.selected] > post2[state.selected]) {
          return 1;
        }
        if (post1[state.selected] < post2[state.selected]) {
          return -1;
        }
        return 0;
      });
    },
    sortedAndSearchPosts(state, getters) {
      const regex = new RegExp(state.search, 'i');
      return getters.sortedPosts.filter(post => regex.test(post.title));
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setLoading(state, bool) {
      state.isPostsLoading = bool;
    },
    setSearch(state, search) {
      console.log('ss');
      state.search = search;
    },
    setPage(state, page) {
      state.page = page;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
    setSelected(state, selected) {
      state.selected = selected;
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit('setLoading', true);
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _limit: state.limit,
              _page: state.page,
            },
          }
        );
        commit('setPosts', response.data);
        commit('setLoading', false);
        commit(
          'setTotalPages',
          Math.ceil(response.headers['x-total-count'] / state.limit)
        );
      } catch (error) {
        console.log(error);
        alert('Error', error.message);
      }
    },
    async loadMorePage({ state, commit }) {
      try {
        commit('setPage', state.page + 1);
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _limit: state.limit,
              _page: state.page,
            },
          }
        );
        commit('setPosts', [...state.posts, ...response.data]);
      } catch (error) {
        console.log(error);
        alert('Error', error.message);
      }
    },
  },
  namespaced: true,
};
