通过配置加载 css 解析后将会生成 style 字符串被添加到 head 标签中, 需要使用到 [style-loader](https://webpack.docschina.org/loaders/style-loader) 和 [css-loader](https://webpack.docschina.org/loaders/css-loader), 在 loader 规则中通过匹配 test 正则解析文件, use 对应 loader 进行转换, 可以链式调用, 将上一个 loader 的输出作为下一个 loader 的输入, 但需要注意的是转换 loader 的顺序问题

```bash
npm install -D style=loader css-loader
```

`webpack.config.js`

```ts
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // 也可以通过一些其他的配置, 如下
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader',
            options: {
              /** 通过什么样的方式注入到 DOM 中 */
              injectType: 'styleTag', // <style>样式代码</style>
              /** 注入到DOM中的位置 */
              insert: 'head', // 可以修改为 body 或者 function
            },
          },
          'css-loader',
        ],
      },
    ],
  },
};
```

其他 css 相关 loader

- [less-loader](https://webpack.docschina.org/loaders/less-loader/): 需要安装 [less](https://lesscss.org/)
- [sass-loader](https://webpack.docschina.org/loaders/sass-loader/): 需要预先安装 [Dart Sass](https://github.com/sass/dart-sass) 或 [Node Sass](https://github.com/sass/node-sass)
- [postcss-loader](https://webpack.docschina.org/loaders/postcss-loader/): 结合 [postcss](https://github.com/postcss/postcss) 作为 css 预处理配置, 可对一些不兼容的属性添加前缀处理
- [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem): 如果开发移动端的话
- [stylus-loader](https://webpack.docschina.org/loaders/stylus-loader/)