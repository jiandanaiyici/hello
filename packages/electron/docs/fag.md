---
id: faq
title: 常见问题
---

### 使用 Node

需要在创建主进程时打开`Node` 设置

```js
const win = new BroswerWindow({
  width: 800,
  height: 1200,
  webPreferences: {
    // 打开 node 开关, 在渲染进程中就可以使用 node
    nodeIntegration: true,
  },
});
```

### 乱码

在 `windows` 中可能会出现乱码情况, `windows` 中输入 `chcp` 查看当前字符编码, 常见的 `gb2312`的值
是 `936`, `utf8` 是 `65001` 在 `package.json` 中进行设置

```json
"start": "chcp 65001 && electron ."
```

### 图标

```json
"win": {
  "icon": "assets/app-icon/win/app.ico"
}

```

### Apple

代码签名