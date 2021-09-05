import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  antd: {},
  outputPath: '../../dist/renderer',
  history: {
    // 解决打包后 electron 跳转问题
    type: 'hash'
  },
  // exportStatic: {
  //   htmlSuffix: true,
  //   dynamicRoot: true,
  // },
  publicPath: '/',
  dynamicImport: {
    loading: '@/pages/loading'
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  // mfsu: {},
  fastRefresh: { },
});
