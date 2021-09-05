export default [
  {
    path: '/',
    component: '@/layout',
    routes: [{
      path: 'home',
      component: '@/pages/home',
    }, {
      path: 'tabs',
      component: '@/pages/tabs'
    }, {
      path: 'about',
      component: '@/pages/about'
    }]
  },
]