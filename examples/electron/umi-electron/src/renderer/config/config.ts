import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  antd: {},
  // layout: {},
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  fastRefresh: {},
});
