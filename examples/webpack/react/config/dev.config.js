const { merge } = require('webpack-merge');
const baseConfig = require('./base.config');

module.exports = merge(baseConfig, {
  devtool: 'source-map',
  mode: 'development',
  watch: true,
  watchOptions: {
    ignored: '**/node_modules',
  },
  devServer: {
    port: 9000,
    hot: true,
    open: true,
    contentBase: '../dist',
  },
});
