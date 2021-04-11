// @ts-nocheck
import { ApplyPluginsType, dynamic } from '/Users/niexiaofei/GitHub/packages/hello-chart/node_modules/@umijs/runtime';
import { plugin } from './plugin';
import LoadingComponent from '@/components/PageLoading/index';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: '.umi__plugin-layout__Layout' */'/Users/niexiaofei/GitHub/packages/hello-chart/src/.umi/plugin-layout/Layout.tsx'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/welcome",
        "name": "welcome",
        "icon": "smile",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Welcome' */'/Users/niexiaofei/GitHub/packages/hello-chart/src/pages/Welcome'), loading: LoadingComponent}),
        "exact": true
      },
      {
        "path": "/antv",
        "name": "antv",
        "icon": "smile",
        "routes": [
          {
            "path": "/antv/l7",
            "name": "l7",
            "icon": "smila",
            "routes": [
              {
                "path": "/antv/l7/basic-heat-map",
                "name": "basic-heat",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__antv__Geospatial__HeatMap' */'/Users/niexiaofei/GitHub/packages/hello-chart/src/pages/antv/Geospatial/HeatMap'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/antv/l7/react-heat-map",
                "name": "react-heat",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__antv__Geospatial__HeatMap__ReactHeatMap' */'/Users/niexiaofei/GitHub/packages/hello-chart/src/pages/antv/Geospatial/HeatMap/ReactHeatMap'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          }
        ]
      },
      {
        "path": "/expand",
        "name": "expand",
        "icon": "expandAlt",
        "routes": [
          {
            "path": "/expand/dropdown",
            "name": "dropdown",
            "icon": "downOut",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__expand__ExpandDropdown__Demo' */'/Users/niexiaofei/GitHub/packages/hello-chart/src/pages/expand/ExpandDropdown/Demo'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "path": "/expand/label-fitler",
            "name": "label-filter",
            "icon": "downOut",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__expand__LabelFilter__Demo' */'/Users/niexiaofei/GitHub/packages/hello-chart/src/pages/expand/LabelFilter/Demo'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "path": "/expand/tree-fitler",
            "name": "tree-filter",
            "icon": "downOut",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__expand__TreeFilter__Demo' */'/Users/niexiaofei/GitHub/packages/hello-chart/src/pages/expand/TreeFilter/Demo'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "path": "/expand/animates",
            "name": "animates",
            "icon": "downOut",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__expand__animates__Demo' */'/Users/niexiaofei/GitHub/packages/hello-chart/src/pages/expand/animates/Demo'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      },
      {
        "path": "/d3",
        "name": "d3",
        "icon": "crown",
        "routes": [
          {
            "path": "/d3/basic",
            "name": "basic",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__d3__basic' */'/Users/niexiaofei/GitHub/packages/hello-chart/src/pages/d3/basic'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "path": "/d3/dagre",
            "name": "dagre",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__d3__dagre' */'/Users/niexiaofei/GitHub/packages/hello-chart/src/pages/d3/dagre'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      },
      {
        "path": "/dom",
        "name": "dom",
        "icon": "crown",
        "routes": [
          {
            "path": "/dom/gantt",
            "name": "gantt",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__dom__Gantt' */'/Users/niexiaofei/GitHub/packages/hello-chart/src/pages/dom/Gantt'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      },
      {
        "path": "/",
        "redirect": "/welcome",
        "exact": true
      },
      {
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/niexiaofei/GitHub/packages/hello-chart/src/pages/404'), loading: LoadingComponent}),
        "exact": true
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
