export default [
  {
    path: '/', component: '@/layout',
    routes: [{
      path: '/',
      redirect: 'home',
    }, {
      path: 'home',
      component: '@/pages/home',
    }, {
      path: 'add-task',
      component: '@/pages/add-task',
    }, {
      path: '/task/:taskId',
      component: '@/pages/task',
    }, {
      path: 'electron-tabs',
      component: '@/pages/electron-tabs-content'
    }]
  },
]