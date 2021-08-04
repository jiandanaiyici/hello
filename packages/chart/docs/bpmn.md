---
id: bpmn
title: BPMN
sidebar_label: BPMN
---


# BPMN

[bpmn-js](https://github.com/bpmn-io/bpmn-js): 是一个BPMN 2.0 渲染工具包和网络建模器, 使用 `JS`开发, 将BPMN2.0 图表嵌入现代浏览器中, 不需要任何服务端开发, 轻松将其嵌入任何Web应用程序中

该库的构建方式使其既可以作为查看器又可以作为Web建模器, 使用 [viewer](https://github.com/bpmn-io/bpmn-js-examples/tree/master/url-viewer) 通过[丰富数据](https://github.com/bpmn-io/bpmn-js-examples/tree/master/overlays) 将 BPMN2.0嵌入您的应用程序中, 可使用 [modeler](https://github.com/bpmn-io/bpmn-js-examples/tree/master/modeler) 在应用程序中创建 BPMN2.0图表

一般现在的应用程序都是通过 [Webpack](https://webpack.js.org/) 构建, 且大多使用 [NPM](https://www.npmjs.com/package/bpmn-js)

### 通过 npm 创建 Modeler

```bash
npm install bpmn-js -S
```

如果在TS中使用, 没有指定 @types, 没有对应的API, 执行摸索

```ts
declare module 'bpmn-js' {
  export default class BpmnJS {
    constructor(param?: { container: string });
    ...
  }
}
```


- [文档链接](https://bpmn.io/toolkit/bpmn-js/walkthrough/): 如何一步步熟悉 [bpmnjs](https://github.com/bpmn-io/bpmn-js)

- [示例代码](https://github.com/bpmn-io/bpmn-js-examples)