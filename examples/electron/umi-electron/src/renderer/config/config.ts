import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  antd: { },
  // layout: {},
  // exportStatic: {
  //   htmlSuffix: true,
  //   dynamicRoot: true,
  // },
  /** 添加 loading */
  // dynamicImport: {
  //   loading: '@/pages/loading',
  // },
  /** 设置根路径 */
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  fastRefresh: { },
});
