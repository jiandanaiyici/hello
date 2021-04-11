// @ts-check
const reactPlugin = require('vite-plugin-react');
const path = require('path');

/**
 * @type { import('vite').UserConfig }
 */
const config = {
  /** 配置端口号 */
  port: 8000,
  /** 是否自动打开浏览器 */
  open: true,
  jsx: 'react',
  alias: {
    '@': path.resolve(__dirname, 'src/'),
  },
  plugins: [reactPlugin],
};

module.exports = config;
