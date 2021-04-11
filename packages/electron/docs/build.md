---
id: build
title: 打包
slug: /build
---

## 参考

- [【译】Electron 打包完全指南](https://juejin.cn/post/6844903588649500680), [原文](https://medium.com/how-to-electron/a-complete-guide-to-packaging-your-electron-app-1bdc717d739f)

官方提供两个模块可用于打包为 `app`, [electron-builder](https://www.electron.build/) 和 [electron-packager](https://github.com/electron/electron-packager) 以及包含其他以 `electron-packager` 为基础的[打包工具](https://github.com/electron/electron-packager#distributable-creators)

**暂未完整打包为 dmg, 第一次成功 之后因代码签名未配置成功 导致**


[公正你的电子申请, 代码签名](https://kilianvalkhof.com/2019/electron/notarizing-your-electron-application/)
---

## electron-builder

```bash
yarn add electron-builder --dev
```

### 通用配置

在 `package.json`顶层添加`build`配置信息

```json
"build": {
  "appId": "com.electron.{name}",
}
```

或者通过 `--config <path/to/yml-or-json5-or-toml-or-js>`, 默认为`electron-builder.yml`

```bash
appId: "com.example.app"
```

同时支持`json` [json5](https://json5.org/) toml 或者 js(导出配置 或 生成配置的函数), 如果想要使用 [toml](https://github.com/toml-lang/toml) 需要安装

```bash
yarn add toml --dev
```

大多数的配置都接受 `null`

```json
"build": {
  "appId": "com.electron.${name}",
  "asar": true,
  "files": ["**/*", "打包出的文件"],
  "output": "打包输出目录, 默认dist",
  "copyright": "Copyright © year ${author} 应用版权",
  "compression": "normal | store | maximum(是否开启压缩)",
  /** 以下各个系统中的配置可覆盖共用配置 */
  "mac": {  // mac 系统配置
    "category": "public.app-category.productivity",
  },
  "dmg": {},    //  DmgOptions
  "pkg": {},    // PkgOptions
  "linux": {},  // linux 配置
  "win": {},    // windows 配置
}

```

- [mac.category](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/LaunchServicesKeys.html#//apple_ref/doc/uid/TP40009250-SW8): 更多关于 `MAC category`

- [其他更多配置](https://www.electron.build/configuration/configuration)

## electron-packager
