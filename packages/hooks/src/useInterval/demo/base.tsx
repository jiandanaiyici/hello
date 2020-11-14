import React, { useCallback, useState } from 'react';

import { useInterval } from '../../index';

export default () => {
  const [count, setCount] = useState(1);
  const add = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, [setCount]);

  useInterval(add, 1000, { immediate: true, manual: true });

  return <div>{count}</div>;
};
