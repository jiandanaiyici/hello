---
id: data
title: 数据管理
---

### 数据存储的方式及不同 ?

`React` 中提供了 `context` `props` `state` 三种方式进行数据管理

- `context`: 多个组件共享的数据常用
- `props`: 子组件接收父组件中的数据
- `state`: 组件内部维护的状态数据

数据流是从上向下传递, 不允许直接修改父组件传递的 `props`, 那么就有一个新的问题, 为什么不能直接修改 `props` 的值 ?

### Redux

什么情况下需要使用 `Redux` ?

- 项目中多数数据为共享数据

### 手写 Redux

### 处理异步

### 关于 dvaÏÏ

### 其他的数据管理

- [Recoil](https://github.com/facebookexperimental/Recoil): 并不代表是官方数据流管理库, [精读 Recoil](https://zhuanlan.zhihu.com/p/143335599)
- [Flux](https://facebook.github.io/flux/)
- [Redux](https://www.redux.org.cn/)
- [MobX](https://cn.mobx.js.org/)
- [Rxjs](https://cn.rx.js.org/)
- [Dvajs](https://dvajs.com/): 更加简化了数据管理

### 参考

- [浅谈 React 数据流管理](https://www.infoq.cn/article/vqmmvsksor8gt3fgesbv)
