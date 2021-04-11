# Hello CSS

[Live Demo](https://hello-css.surge.sh/)

[文档](https://niexiaofei1988.github.io/hello-css/#/)

> 为什么不使用脚手架 ?

1. 不能频繁的使用脚手架还不知道具体的配置, 只会更落后
2. 长时间使用脚手架之后发现会变得越来越呆, 不会开发了
3. 无论是尝试也好真心学习也好, 最终只要是会用就好
4. 在会用的基础上, 搭建属于自己的一个完整脚手架, 包括分析等功能

## 目录结构

```
.
├── CNAME
├── README.md
├── config                  # 打包配置
│   ├── base.config.ts
│   ├── dev.config.ts
│   ├── plugins.ts
│   ├── prod.config.ts
│   └── util.ts
├── dist                    # 输出文件
├── package.json
├── shim.d.ts
├── src                     # 输入文件
│   ├── assets              # 静态资源
│   │   └── vue.less
│   ├── global.less         # 全局样式
│   ├── pages               # 多页路由入口
│   │   ├── 404.ts
│   │   ├── index.ts
│   │   └── resume.ts
│   ├── public              # 公共资源
│   │   ├── avatar.jpeg
│   │   └── index.html
│   ├── routes              # 路由配置, 目前只有 vue
│   ├── typings             # ts 定义
│   │   └── global.d.ts
│   ├── utils               # 公共工具
│   │   └── resume.ts
│   └── views               # 专属 vue
│       └── NotFound.vue
├── surge.md
├── tsconfig.json
└── vue.md                  # vue 搭建过程描述记录
```

### 目录清单

#### Vue

- Vue3 + TS
- webpack 自定义脚手架(后续会替换目前的一些基础配置)
- Vue 的一些基础及深层的理解

#### CSS

- css3 布局(`flex`) 动画(`transform` 等) 过渡(`transition`) 及 `3D`的一些简单重温 及 示例
- 收集一些比较好的效果(在学习的过程中加深理解)

#### 其他待定

> 约定这里 `hello-css` 就是大部分应该和 `css` 相关的, 其他的比如 `react` 或者 `chart`(图表) 有另外的仓库


[filename](./test.less ':include :type=code')
