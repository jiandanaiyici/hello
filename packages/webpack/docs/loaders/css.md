# style-loader

建议和 [css-loader]()一起使用

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
