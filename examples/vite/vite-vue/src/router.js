import { createRouter, createWebHistory } from 'vue-router';
import Welcome from './views/Welcome.vue';
import RefDemo from './components/RefDemo.vue';
import FragmentDemo from './components/FragmentDemo.vue';

export const routerHistory = createWebHistory();

export const router = createRouter({
  history: routerHistory,
  strict: true,
  routes: [{ path: '/home', redirect: '/' },
  {
    path: '/',
    components: { default: Welcome },
  }, {
    path: '/fragment',
    components: { default: FragmentDemo },
  }, {
    path: '/ref',
    components: { default: RefDemo },
  },]
});
