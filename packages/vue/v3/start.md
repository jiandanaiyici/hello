---
sidebar: auto
title: 你好 vue3
---

## 搭建

搭建方法有很多种, 有官方的 [vue-cli](https://cli.vuejs.org/zh/) 和 新工具 [vite](https://github.com/vitejs/vite)

### Vite

在这里首先尝试使用配套的开发工具 [vite](https://github.com/vitejs/vite)来搭建我们的 vue 项目

```bash
yarn create vite-app <project-name>
# 或者使用 npm
npm init vite-app <project-name>

# 根据文档中描述还可以支持其他的UI框架比如 React 或者 preact, 还未进行尝试
npm init vite-app --template react
npm init vite-app --template preact
```

### vue-cli

## API

在 vue3 中提供了很多新的 API 钩子, 可以理解为 vue 版的 hooks 钩子, 最初的时候使用 React 比较多, 虽然可能也不是很熟悉, 但用了 hooks 之后就发现写起来代码更加简洁, 那么 Vue 新增的 API 有哪些呢 ?

### setup

一个组合型的入口函数, 即在调用 `beforeCreate`之前调用, 在调用此函数之前, 需要接受 `props`的值, 但是在使用时不要将 `props`进行解构,否则会失去响应性, 可能会导致后续的开发过程中对数据的掌控变的不可控

```ts
export default {
  props: {
    name: 'props name',
  },
  setup(props) {
    console.log(props.name, '>>>>>');
  },
};
```

### ref

### reactive

### computed

### readonly

### watchEffet

### watch

## 标签

除了一些新增的 API 可以使书写组件时使用函数式的开发, 同时还增加了一些标签来解决一些常见的开发问题, 比如在 Vue 文件中, 一个组件必须包含一个且是唯一的根节点, 这样做的问题就是必须要在外层包含一个可以理解为需用的 标签比如: div. 但恰恰因为这个多雨的 标签, 可能会导致我们在开发的过程汇总增加很多并不是效果那么好的一个样式问题

### Fragment

看到这个是不是特别熟悉 ? 没错在 React 中同样存在这个组件标签, 其作用也一样, 就桑为了避免更多无意义的嵌套关系,可能会导致一些样式会受到影响变化

```html
<template>
  <div>这是旧版本中使用, 必须要包含一个根节点</div>
</template>
<template>
  <Fragment>这是新版本中可以不使用空的标签作为根节点</Fragment>
</template>
```

## 参考

- [vite 如何做到让 vue 本地开发更快速？](https://developer.aliyun.com/article/761551)
- [Vue3 新特性一篇搞懂](https://juejin.im/post/5e6388366fb9a07cda097c47)

### 示例

```bash
cd vite-vue
yarn
yarn dev
```
