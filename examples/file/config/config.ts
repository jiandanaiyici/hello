/** https://umijs.org/config/ */
import { defineConfig } from 'umi';
// import defaultSettings from './defaultSettings';
import routes from './route';
// import { getIp } from './util';

// const networkIp = getIp();

export default defineConfig({
  history: {
    type: 'hash',
  },
  targets: {
    ie: 11,
  },
  dynamicImport: {
    loading: '@/components/PageLoading',
  },
  // mfsu: {},
  locale: {
    default: 'zh-CN',
    antd: false,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
  antd: {},
  dva: {},
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  // theme: {
  // },
  // define: {},
  // ignoreMomentLocale: true,

  // manifest: {
  //   basePath: '/',
  // },
  // layout: {
  //   // https://procomponents.ant.design/components/layout#prolayout
  //   name: 'Ant Design',
  //   locale: true,
  //   layout: 'side',
  // },
  // chainWebpack: webpackPlugin,
  // proxy: {
  //   '/server': {
  //     target: `http://${networkIp}:3000/`,
  //     changeOrigin: true,
  //     pathRewrite: { '^/server': '' },
  //   },
  // },
});
