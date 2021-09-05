# 技术栈

- [electron-webpack](https://webpack.electron.build/): 构建主进程的打包配置
- [umi](https://umijs.org/zh-CN/docs): 渲染进程基础脚手架
- [Typescript](https://www.typescriptlang.org/): 添加类型辅助
- [Antd](https://ant.design/): UI库
- [electron-builder](https://www.electron.build/): 构建成 electron 应用程序
- [concurrently](https://www.npmjs.com/package/concurrently)
- [ts-loader](https://github.com/TypeStrong/ts-loader): 替换了 awesome-typescript-loader 对主进程中的TS进行编译

# 搭建

- 失败

```bash
# 因网络问题无法下载
git clone https://github.com/electron-userland/electron-webpack-quick-start.git

# 删除 git
rm -rf .git

# 使用 yarn 安装
```

## 手动创建 umi 应用

```bash
# 初始化
yarn create @umijs/umi-app

# 安装依赖
yarn
```

### 修改目录

- 将初始化后的 src 下创建 renderer(渲染进程) 及将 pages 和 umirc.ts(修改为 config/config.ts)

### 修改启动命令

- 修改启动路径 [APP_ROOT](https://umijs.org/zh-CN/docs/env-variables#app_root)

```json
"dev": "APP_ROOT=src/renderer umi dev"
```

- 随后启动, 访问 [http://localhost:8000](http://localhost:8000) 正常

### 修改配置

- 默认支持 antd
- 修改 `config.ts` 打包导出多个 html 文件
- 添加动态 loading

```ts
  exportStatic: {
    htmlSuffix: true,
    dynamicRoot: true,
  },
  publicPath: '/',
  dynamicImport: {
    loading: '@/pages/loading'
  },
```

### 添加 Electron 相关依赖

```bash
# 基础依赖
yarn add electron-webpack electron webpack --dev

yarn add source-map-support

# TS 支持
yarn add typescript electron-webpack-ts --dev
```

修改 `package.json`

```json
"start:main": "electron-webpack dev"
```

### 配置 webpack

- webpack.base.config.js

```ts
const path = require('path');

module.exports = {
  entry: {
    main: path.resolve(__dirname, '../src/main/index.ts'),
    output: {
      path: path.resolve(__dirname, '../dist/main'),
      filename: '[name].js'
    },
    node: {
      /** 解决无法加载 fs */
      fs: 'empty',
      __dirname: false,
      __filename: false,
    },
    module: {
      rules: {
        test: /\.tsx?$/,
        /** 不使用 awesome-typescript-loader 因为无法支持最新 webapck 和 typescript 的解析 */
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
        }
      }
    }
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
  devtool: 'source-map'
}
```
- webpack.main.dev.config.js

```ts
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webapck.base.config');

module.exports = merge.smart(baseConfig, {
  mode: 'development',
  plugins: [
    new webpack.DefineConfig({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
});
```

- webpack.main.prod.config.js

```ts
const path = require('path');
const merge = require('webpack-merge');
const baseCofnig = require('./webpack.base.config');

module.exports = merge.smart(baseConfig, {
  mode: 'production'
});
```

### 命令


```bash
# 启动主进程 和 渲染进程
yarn start

# 启动主进程
yarn start:main

# 启动渲染进程
yarn start:renderer

# 构建
yarn build

# 构建主进程
yarn build:main

# 构建渲染进程
yarn start:renderer
```
