# 介绍

> 从 `V4.x` 之后不再强制需要使用配置文件`webpack.config.js`, 可以零配置的进行使用

## 安装

```bash
npm i webpack-cli webpack -D
```

### 需要掌握的知识

- Nodejs NPM
- 抽象语法树

## 实例

每次根据提交记录

- [初始化项目](https://github.com/jiandanaiyici/webpack-demo/commit/b3742cec7e8f20ca9f4027f75ebea92fb5883793)
- [不使用配置项](https://github.com/jiandanaiyici/webpack-demo/commit/45ebe5973119bf95c275c2c159f6b8a03ac83511): 不使用 `webpack.config.js`配置文件及其他的参数使用, 执行 `npx webpack`
- [基础配置](https://github.com/jiandanaiyici/webpack-demo/commit/5e37f2356aa108c921b18cdb07ed93071f867a4a): 可以使用 `webpack.config.js` 和 `webpackFile.js`, 一般使用 `webpack.config.js`形式, 本次执行 `npm run build` === `npx webpack`
- [开发服务](https://github.com/jiandanaiyici/webpack-demo/commit/1c15804a1046783bf3edbde8478a5d34924e8762): 使用 `webpack-dev-server`, 执行 `npm run dev`, 添加 `html-webpack-plugin`生成 `html` 文件
- [加载 css](https://github.com/jiandanaiyici/webpack-demo/commit/72b56e4d342f2c805793631ccfb8e6be77c34046): 基本的 `css` 使用
- [使用 less](https://github.com/jiandanaiyici/webpack-demo/commit/369b5a2bfbb24540c8e440f95ec0f02405524eab): 最基础 `less` 使用, 会在 `style` 中展示
- [scss](https://github.com/jiandanaiyici/webpack-demo/commit/d2d18f97f61ab4926691f1f901dd39f8d2a52316): 官方推荐使用 [Dart Sass](https://webpack.docschina.org/loaders/sass-loader/#root)

## 编辑器

在 `vscode` 中安装 [webpack](https://marketplace.visualstudio.com/items?itemName=jeremyrajan.webpack), `cmd + shift + p` 使用 `webpack create` 创建基础的 `webpack.config.js`

## 工具

[html-webpack-plugin](../file/webpack/html-webpack-plugin.ts ':include :type=code')

`webpack-dev-server`: 在 `webpack-cli V4.x` `webpack V5` 之后使用 `webpack serve`启动 且可替换 `webpack-dev-server` 为 `@webpack-cli/serve`

[webpack-dev-server](../file/webpack/webpack-dev-server.ts ':include :type=code')
