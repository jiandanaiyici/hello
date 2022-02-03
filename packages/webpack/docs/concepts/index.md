[Webpack](https://webpack.docschina.org/concepts/) 是一个现代 Javascript 应用程序的静态模块打包构建工具, 当对程序处理时 会在内部从一个或多个入口构建一个依赖图, 然后将程序中所依赖的各个模块组合成一个或多个 bundles, 简单来说就是把所有程序中需要用到的文件都看做是静态资源, 通过构建一个相互之间的依赖关系把所有文件按照顺序组合成最终的一个或者多个文件供程序使用


在开始之前需要了解下相关的核心概念

- 入口起点(entry): 作为整个应用程序的入口配置(就是从哪里开始构建依赖图), 单入口时默认为 `src/index.js`,可以通过 [config entry](https://webpack.docschina.org/configuration/entry-context/#entry) 手动修改入口路径
```ts
module.exports = {
  entry: '/src/entry.js', // 可以配置多个入口
}
```
- 输出(output): 告诉 webpack 在哪里输出所创建的 bundle 文件,以及如何命名这些文件. 默认输出路径为 `dist/main.js`
```ts
module.exports = {
  entry: '/src/entry.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

- loader: 默认 webpack 开箱即用只能加载解析 js 和 json 文件, 针对其他非自带解析功能的模块 如 `typescript` 或 `less` `sass` `图片` 及字体文件的解析需要借助于 [loader](https://webpack.docschina.org/concepts/#loaders)将其转换为可用的[模块](https://webpack.docschina.org/concepts/modules)文件, 最简单的 loader 配置有两个必须的属性
  - test: 通过正则进行匹配哪些文件需要被转换
  - use: 定义匹配到的文件需要通过哪些 loader 进行解析
```ts
module.exports = {
  module: {
    rules: [{
      test: /\.txt$/,
      use: 'raw-loader'
    }]
  }
}
```
以上配置简单的解释为: 当通过 `require/import` 加载到 `.txt`后缀文件时通过 [raw-loader](https://v4.webpack.js.org/loaders/raw-loader/)转换下然后输出到引用的地方, 这里需要注意的是 [webpack5 之后的变化](https://webpack.docschina.org/guides/asset-modules/#root)

- 插件(Plugin): [插件](https://webpack.docschina.org/api/plugins)主要用于执行范围更广的任务, 包括: 打包优化,资源管理及注入环境变量等, 区别于 loader(主要针对其他模块类型的文件转换). 配置文件中可以添加多个插件, 一般理解使用插件通过 `new` 创建插件实例, 所以多个同类插件需要创建多个实例, 且大多数插件都可以通过 `option`进行额外的一些配置, 比如 压缩 等, 以下就以常见的 [html-webpack-plugin](https://webpack.docschina.org/plugins/html-webpack-plugin/#root)

```ts
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: 'src/index.js',
  output: {
    filename: 'index_bundle.js',
    path: path.resolve(__dirname, 'dist/')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }), // 这里
  ]
}

```

### 提交记录查看
- [初始化及零配置构建](https://github.com/jiandanaiyici/hello/commit/17a484fd28176271dcdfdbd866799754399e273e)
- [手动修改入口配置](https://github.com/jiandanaiyici/hello/commit/a6a4e0b3caef5c40b229947f983320790f2fcb1f)
- [修改输出配置](https://github.com/jiandanaiyici/hello/commit/223a0b11585ed36288a70991342352bc55bd5a8b)
- [添加 html-webpack-plugin](https://github.com/jiandanaiyici/hello/commit/47dc8097b4b09a28ed138219349b14f72d84cd46): 根据模板自动生成 html 并自动引入 js 文件
- [加载 css 文件](): 配置 [loader 加载 css 文件](loaders/css), 添加 style 到 head 标签中