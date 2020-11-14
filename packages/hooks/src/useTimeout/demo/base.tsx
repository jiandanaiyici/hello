import React, { useCallback, useState } from 'react';

import { useTimeout } from '../../index';

export default () => {
  const [count, setCount] = useState(1);
  const add = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, [setCount]);

  useTimeout(add, 1000, { immediate: true, manual: true });

  return <div>{count}</div>;
};
