---
title: useTimeout
---

## 基础使用

<code src="./demo/base.tsx" />

## 手动触发

<code src="./demo/manual.tsx" />

## API

### Param

| 参数  | 说明         | 类型                              |
| ----- | ------------ | --------------------------------- |
| fn    | 执行的函数   | `() => void`                      |
| delay | 循环间隔时间 | `undefined` \| `null` \| `number` |
| opts  | 额外配置     | [IntervalOpts](#intervalopts)     |

### IntervalOpts

| 参数      | 说明             | 类型                              |
| --------- | ---------------- | --------------------------------- |
| immediate | 首次是否立即执行 | `boolean`                         |
| manual    | 是否可以手动触发 | `boolean` true: 自动, false: 手动 |

### Return

| 参数  | 说明 | 类型         |
| ----- | ---- | ------------ |
| start | 执行 | `() => void` |
| stop  | 停止 | `() => void` |
