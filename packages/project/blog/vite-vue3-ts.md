---
slug: vite-vue3-ts
title: vite-vue3-ts
author: NHF
# author_title: Front End Engineer @ Facebook
# author_url: https://github.com/yangshun
author_image_url: https://avatars0.githubusercontent.com/u/1315101?s=400&v=4
# tags: [facebook, hello, docusaurus]
---

###

- 架构搭建
- 代码规范
- 提交规范
- 单元测试
- 自动部署

### 技术栈

- [TypeScript4.x](https://www.typescriptlang.org/zh/) & [Javascript](https://www.javascript.com/)

### 架构搭建

#### 初始化

使用 [vite](https://cn.vitejs.dev/) 进行初步搭建

```bash
yarn create @vitejs/app

# NPM
npm init @vitejs/app
```

#### 配置

修改`vite.config.ts`做一些简单的配置调整, 添加 `alias` 路径

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// 如果提示找不到时可以通过安装 @types/node
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  base: './', // 设置打包路径
  server: {
    port: 4000,
    open: true, // 自动打开浏览器
    cors: true, // 跨域设置,
    proxy: {
      // 代理设置
      '/api': {
        target: 'http://xxx.xxx.xxx.xxx:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace('/api/', '/'),
      },
    },
  },
});
```

#### 目录结构

```makefile
├── publish/
└── src/
    ├── assets/                    // 静态资源目录
    ├── common/                    // 通用类库目录
    ├── components/                // 公共组件目录
    ├── router/                    // 路由配置目录
    ├── store/                     // 状态管理目录
    ├── style/                     // 通用 CSS 目录
    ├── utils/                     // 工具函数目录
    ├── views/                     // 页面组件目录
    ├── App.vue
    ├── main.ts
    ├── shims-vue.d.ts
├── tests/                         // 单元测试目录
├── index.html
├── tsconfig.json                  // TypeScript 配置文件
├── vite.config.ts                 // Vite 配置文件
└── package.json
```

---

### 参考

- [从 0 开始手把手带你搭建一套规范的 Vue3.x 项目工程环境](https://juejin.cn/post/6951649464637636622)
