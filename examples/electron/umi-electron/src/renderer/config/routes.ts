export default [
  {
    path: '/', component: '@/layout',
    routes: [{
      path: '/',
      redirect: 'home',
    }, {
      path: '/home',
      component: '@/pages/home',
      name: '首页',
    }, {
      path: '/add-task',
      component: '@/pages/add-task',
      name: '新建任务'
    }, {
      path: '/unmount',
      component: '@/pages/unmount',
      name: '卸载'
    }, {
      path: '/task/:taskId',
      component: '@/pages/task',
      pass: true,
    }, {
      path: '/electron-tabs',
      component: '@/pages/electron-tabs-content',
      name: 'Tabs'
    }]
  },
]