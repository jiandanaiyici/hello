---
title: Process
---

[process](https://nodejs.org/api/process.html): 是 `node` 中的一个模块, 创建一个文件 `process.js`, 在执行 `node` 命令之后对于一些进程相关的很有用, 另外还有一个衍生的子进程([child_process](http://nodejs.cn/api/child_process.html))

---

### 常用

#### 读取变量

```ts
process.env.NODE_ENV; // development
```

#### argv

> 读取执行命令传递的参数, 返回一个数组, 第一个元素是当前执行 `node` 的绝对路径[process.execPath](http://nodejs.cn/api/process.html#process_process_execpath), 第二个元素是当前执行命令脚本的绝对路径, 之后的其他元素就是传递的命令行参数了, 比如以下代码

```json
node ./docs/node/process.js name=name age=100
```

将会被解析为:

```ts
[
  // 当前node 的绝对路径
  // 后缀为 zhdocs/node/process.js的绝对路径
  /** 剩下就是参数了 */
  name=name
  age=100
]
```
