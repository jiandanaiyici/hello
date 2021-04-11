## 安装

```bash
# 初始化
npm init -y

# 基础环境
npm install -D webpack webpack-dev-server webpack-cli html-webpack-plugin clean-webpack-plugin webpack-merge
```

### 基础配置

```ts
export default {
  entry: {
    index: '../src/pages/index.ts',
  },
  devServer: {
    port: 3000,
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
};
```

> 在上方的配置中使用的是 `ES6` 的语法, 需要进行一些额外的配置 及配置 `tsconfig.json`

```bash
npm install --save-dev typescript ts-node @types/node @types/webpack ts-loader
```

### 配置 css

```bash
npm install -D css-loader less-loader
```

```ts
export default {
  module: {
    rules: [
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
    ],
  },
};
```

### 配置 vue

```bash
npm install -S vue

npm install -D vue-loader vue-template-compiler
```

```ts
import VueLoaderPlugin from 'vue-loader/lib/plugin';

/** 配置单文件 */
export default {
  module: {
    rules: [
      {
        test: /.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  /** 除了配置 vue-loader之外需要插件支持 */
  plugins: [
    new VueLoaderPlugin({
      transformAssetUrls: {
        video: ['src', 'poster'],
        source: 'src',
        img: 'src',
        image: ['xlink:href', 'href'],
        use: ['xlink:href', 'href'],
      },
    }),
  ],
};
```

### 路由

```bash
npm install -S vue-router
```

> router.ts

```ts
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  routes: [],
});
```

> 增加路由守卫 nprogress `npm install -S nprogress`

```ts
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

/** 前置守卫 */
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

/** 后置守卫 */
router.afterEach((to, from) => {
  NProgress.done();
});
```

> 完整代码可查看 `config/` 及 `routes/` 下
> 待完整的东西比较多

- 路由守卫
- 路由过渡
- 数据流
- 动态加载

> 因为这里是 `css` 的一些记录, 所以后续需要添加各种 `css3` 的一些基础知识及常见示例, 另增加 [简历](http://strml.net/) 的示例
