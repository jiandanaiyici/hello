import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  electronBuilder: {
    buildType: 'webpack', // webpack || vite
    /** 路由配置 */
    routerMode: 'hash',
    outputDir: 'dist',
    builderOptions: {
      //配置参考 https://www.electron.build/configuration/configuration
      appId: 'com.test.test',
      productName: '测试',
      publish: [
        {
          provider: 'generic',
          url: 'http://localhost/test',
        },
      ],
    },
  },
  antd: { },
  // layout: {},
  exportStatic: {
    htmlSuffix: true,
    dynamicRoot: true,
  },
  /** 添加 loading */
  dynamicImport: {
    loading: '@/pages/loading',
  },
  publicPath: '../',
  /** 设置根路径 */
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  // fastRefresh: { },
});
