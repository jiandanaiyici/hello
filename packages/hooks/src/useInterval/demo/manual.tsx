/** 手动触发 */
import React, { Fragment, useCallback, useState } from 'react';
import { Button, Space } from 'antd';
import { useInterval } from '../../index';

export default () => {
  const [count, setCount] = useState(1);
  const add = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, [setCount]);

  const { start, stop } = useInterval(add, 1000, {
    manual: true,
  });

  return (
    <Fragment>
      <p>{count}</p>
      <Space>
        <Button type="primary" size="small" onClick={start}>
          Start
        </Button>
        <Button size="small" onClick={stop}>
          Stop
        </Button>
      </Space>
    </Fragment>
  );
};
