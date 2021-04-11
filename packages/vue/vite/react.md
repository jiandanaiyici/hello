---
sidebar: auto
title: React + Vite
---

## 创建

```bash
npm init vite-app <projectName> --template react

cd projectName
yarn
# 启动
yarn dev

```

> 当使用模板搭建好项目之后, 启动可以看到一个简单的 `React` 环境已经搭建好了, 后续还有很多其他的方面需要进行补充, 比如 `less` 和 `ts`

## 转换 TS

```bash
yarn add typescript@beta less

yarn add @types/react @types/react-dom
```

> 新建 ts 配置文件 `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "esnext",
    "lib": ["DOM", "DOM.Iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": false,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "jsxFactory": "h",
    "jsxFragmentFactory": "Fragment"
  },
  "include": ["src"]
}
```

> 因为在项目中需要使用到`less` 以及 `svg` 等资源, 需要进行额外的 `ts`方面处理, 比如以下方式

```ts
declare module '*.svg';
```

## 参考

- [Vite with Preact and TypeScript](https://fettblog.eu/typescript-vite-preact/): 虽然是 Preact, 但逻辑上是相通的

<!-- https://juejin.im/post/5e71db2ee51d45270313855c#heading-4 -->

<!-- https://juejin.im/post/5f1463ae5188252e7c21d7fa -->
