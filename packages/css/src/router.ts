import Vue from 'vue';
import VueRouter from 'vue-router';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.use(VueRouter);

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载 icon
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化的最小百分比
});

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: () => import('./views/Home.vue'),
    },
    /** 背景 */
    {
      path: '/background',
      component: () => import('./views/background/index.vue'),
    },
    /** 布局 */
    {
      path: '/layout/',
      component: () => import('./views/layout/index.vue'),
    },
    /** 文本 */
    {
      path: '/text',
      component: () => import('./views/text/index.vue'),
    },
    /** 动画 */
    {
      path: '/transition',
      component: () => import('./views/transition/index.vue'),
    },
    /** 变换 */
    {
      path: '/transform',
      component: () => import('./views/transform/index.vue'),
    },
    /** 媒体查询 */
    {
      path: '/media-query',
      component: () => import('./views/media/index.vue'),
    },
    /** 函数 */
    {
      path: '/function',
      component: () => import('./views/function/index.vue'),
    },
    {
      path: '*',
      component: () => import('./views/NotFound.vue'),
    },
  ],
});

/** 前置守卫 */
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

/** 后置守卫 */
router.afterEach((to, from) => {
  NProgress.done();
});

export default router;
