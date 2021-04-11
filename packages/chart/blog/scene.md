---
id: scene
title: Scene 组件
sidebar_label: 通过源码学习封装 组件
---

### 错误示范

> 在刚开始的时候看到有 `React` 版本时, 就像尝试着写一个, 可写来写去总是有哪里不对, 总会报错各种找不到的场景, 直到看了源码之后就感觉有些明白了, 那么刚开始的实现哪里出现了问题呢, 就开始回忆, 似乎是忘记了 加载无论是高德地图或者是其他第三方的地图时是异步加载, 需要在加载结束之后才能执行自己的业务逻辑

- 首先看下自己实现的版本

```tsx
import React, { useRef, useEffect, ReactNode } from 'react';
import { IMapWrapper, Scene } from '@antv/l7';

export interface Iprops {
  /** 地图实例 */
  map: IMapWrapper;
  style?: React.CSSProperties;
  className?: string;
  children?: ReactNode;
}

// 后来添加的, 这个不是重点, 重点是赋值那块
export default React.memo((props: Iprops) => {
  const { map } = props;
  const intsRef = useRef<Scene | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    /** 初始化实例 */
    const sceneInts = new Scene({
      id: containerRef.current as HTMLDivElement,
      map,
    });

    /** 赋值 */
    intsRef.current = sceneInts;

    return () => {
      if (intsRef.current) {
        intsRef.current.destroy();
      }
    };
  }, []);

  return <div ref={containerRef}>{props.children}</div>;
});
```

> 刚开始时欣喜若狂的自我感觉良好, 总觉得自己写的不会有 `bug`, 那么好跑起来试试吧, 接下来的就是啪啪打脸, 生疼. 各种报错找不到什么的, 但百思不得其解啊脑子啊嗡嗡的, 后来看了源码才知道忽略了重要的一点, 就是加载地图是异步操作, 需要等地图加载完毕之后重新赋值才不会报错, 既然已经知道了问题, 那么就应该知道怎么样解决

- 修改后只展示修改的代码

```tsx
useEffect(() => {
  /** 初始化实例 */
  const sceneInts = new Scene({
    id: containerRef.current as HTMLDivElement,
    map,
  });

  /** 注意这里添加 on loaded 事件 */
  sceneInts.on('loaded', () => {
    intsRef.current = sceneInts;
  });

  return () => {
    if (intsRef.current) {
      intsRef.current.destroy();
    }
  };
}, []);
```

> 这次尝试了以下是好了的, 终于可以解决掉了, 但是我们再看下[官方提供](https://github.com/antvis/L7/blob/master/packages/react/src/component/Scene.tsx)的一个版本, 提供了一个可以获取到[实例 useSceneValue hooks](https://github.com/antvis/L7/blob/master/packages/react/src/component/SceneContext.tsx)的方法, 看到这里就不得不说一句, 既然提供了 `React` 版本那么创建实例时的一些配置项就不允许自定义了吗, 比如 `logo`是否展示, 可能对于很多人来说并不是很想展示出来`logo`, 这个在其他的 `React` 组件中添加了 [`option` 配置项](https://github.com/antvis/L7/blob/master/packages/react/src/component/AMapScene.tsx#L11)

- 最后就是添加的 `Hooks`

`SceneContext.ts`

```tsx
import { Scene } from '@antv/l7';
import { createContext, useContext } from 'react';

export const SceneContext = createContext<Scene | undefined>({} as Scene);
export function useSceneValue(): Scene {
  return (useContext(SceneContext) as Scene | undefined) as Scene;
}
```
