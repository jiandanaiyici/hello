import { resolve } from './util';
import plugins from './plugins';

export default {
  entry: {
    index: resolve('../src/pages/index.ts'),
    resume: resolve('../src/pages/resume.ts'),
    404: resolve('../src/pages/404.ts'),
  },
  output: {
    filename: '[name].bundle.js',
    path: resolve('../dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('../src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: ['source-map-loader'],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {},
          },
        ],
      },
      /** 配置 vue */
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ],
  },
  devServer: {
    port: 9000,
    hot: true,
    open: true,
  },
  optimization: {
    minimize: true,
  },
  plugins,
  stats: {
    assets: false,
    modules: false,
    entrypoints: false,
  },
};
