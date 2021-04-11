---
sidebar: auto
title: useSelections
---

## React

```ts
import { useState } from 'react';

const useSelections = () => {};

export default useSelections;
```

## Vue

```ts
/** 拷贝的代码, 占位 */
export function useDebugState(label, initialValue) {
  const state = ref(initialValue);
  watch(() => {
    console.log(`${label}: `, state.value);
  });
  return state;
}

// elsewhere:
const name = useDebugState('Name', 'Mary');
```
