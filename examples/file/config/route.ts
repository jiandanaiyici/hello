export default [
  {
    path: '/',
    component: '../layouts',
    routes: [
      {
        path: '/',
        redirect: '/welcome',
      },
      {
        path: '/welcome',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome',
        hideInMenu: true,
        hideChildrenInMenu: true,
      },
      {
        path: 'text',
        name: 'text',
        component: './text',
      },
      {
        path: 'images',
        name: 'images',
        routes: [
          {
            path: 'upload',
            name: 'upload',
            component: './imgs/upload',
          },
        ],
      },
      {
        path: 'table',
        name: 'table',
        routes: [
          {
            path: 'local',
            name: 'local',
            component: './table/local',
          },
          {
            path: 'server',
            name: 'server',
            component: './table/server',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
];
