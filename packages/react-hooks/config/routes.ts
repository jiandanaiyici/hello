export default [
  {
    path: '/',
    component: '@/pages/index',
  },
  {
    path: 'hooks',
    name: '自定义Hooks',
    routes: [
      {
        path: 'useTip',
        name: 'useTip',
        component: './hooks/Tip',
      },
      {
        path: 'useResizeRect',
        name: 'useResizeRect',
        component: './hooks/Rect',
      },
    ],
  },
  {
    name: '403',
    path: '/exception403',
    hideInMenu: true,
    component: './Exception/403',
  },
  {
    name: '500',
    hideInMenu: true,
    path: '/exception500',
    component: './Exception/500',
  },
  {
    path: '*',
    component: './Exception/404',
  },
];
