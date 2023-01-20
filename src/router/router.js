import { createRouter, createWebHistory } from 'vue-router';
import Main from '../pages/Main.vue';
import PostsPage from '../pages/PostsPage.vue';
import PostPage from '../pages/PostPage.vue';
import About from '../pages/About.vue';
import PostsPageWithStore from '@/pages/PostsPageWithStore.vue';
import PostsPageCompositionApi from '@/pages/PostsPageCompositionApi.vue';

const routes = [
  {
    path: '/',
    component: Main,
  },
  {
    path: '/posts',
    component: PostsPage,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/post/:id',
    component: PostPage,
  },
  {
    path: '/store',
    component: PostsPageWithStore,
  },
  {
    path: '/composition',
    component: PostsPageCompositionApi,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
