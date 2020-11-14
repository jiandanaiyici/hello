import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  antd: {
    dark: false,
  },
  layout: {
    title: '玩呢',
    theme: 'light',
    navTheme: 'light',
  },
  routes,
  publicPath: './',
  history: {
    type: 'hash',
  }
});
