import VueLoaderPlugin from 'vue-loader/lib/plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { resolve } from './util';

export default [
  new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
  new HtmlWebpackPlugin({
    title: '首页',
    chunks: ['index'],
    filename: 'index.html',
    minify: 'auto',
    // favicon: './avatar.jpeg',
    template: resolve('../src/public/index.html'),
  }),
  new HtmlWebpackPlugin({
    minify: 'auto',
    title: '动态简历',
    chunks: ['resume'],
    filename: 'resume.html',
    template: resolve('../src/public/index.html'),
  }),
  new HtmlWebpackPlugin({
    title: 'Not Found',
    filename: '404.html',
    chunks: ['404'],
    minify: 'auto',
    template: resolve('../src/public/index.html'),
  }),
  /** 配置 vue */
  new VueLoaderPlugin({
    transformAssetUrls: {
      video: ['src', 'poster'],
      source: 'src',
      img: 'src',
      image: ['xlink:href', 'href'],
      use: ['xlink:href', 'href'],
    },
  }),
];
