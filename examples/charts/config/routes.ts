export default [
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/antv',
    name: 'antv',
    icon: 'smile',
    routes: [
      {
        path: '/antv/l7',
        name: 'l7',
        icon: 'smila',
        routes: [
          {
            path: '/antv/l7/basic-heat-map',
            name: 'basic-heat',
            component: './antv/Geospatial/HeatMap',
          },
          {
            path: '/antv/l7/react-heat-map',
            name: 'react-heat',
            component: './antv/Geospatial/HeatMap/ReactHeatMap',
          },
        ],
      },
    ],
  },
  {
    path: '/expand',
    name: 'expand',
    icon: 'expandAlt',
    routes: [
      {
        path: 'dropdown',
        name: 'dropdown',
        icon: 'downOut',
        component: './expand/ExpandDropdown/Demo',
      },
      {
        path: 'label-fitler',
        name: 'label-filter',
        icon: 'downOut',
        component: './expand/LabelFilter/Demo',
      },
      {
        path: 'tree-fitler',
        name: 'tree-filter',
        icon: 'downOut',
        component: './expand/TreeFilter/Demo',
      },
      {
        path: 'animates',
        name: 'animates',
        icon: 'downOut',
        component: './expand/animates/Demo',
      },
    ],
  },
  {
    path: '/d3',
    name: 'd3',
    icon: 'crown',
    routes: [
      {
        path: 'basic',
        name: 'basic',
        component: './d3/basic',
      },
      {
        path: 'dagre',
        name: 'dagre',
        component: './d3/dagre',
      },
    ],
  },
  {
    path: '/dom',
    name: 'dom',
    icon: 'crown',
    routes: [
      {
        path: 'gantt',
        name: 'gantt',
        component: './dom/Gantt',
      },
    ],
  },
  // {
  //   path: '/admin',
  //   hideInMenu: true,
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //   ],
  // },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
