import React from 'react';
import { Card, InputNumber } from 'antd';
import { useSetState } from 'ahooks';

import TranslateBorder from './TranslateBorder';

const Demo = () => {
  const [state, setState] = useSetState({
    x: 0,
  });

  return (
    <Card title="Border 移动">
      <TranslateBorder x={state.x}>TranslateBorder</TranslateBorder>
      <span>向右移动: </span>
      <InputNumber
        max={1000}
        value={state.x}
        step={100}
        onChange={(e) => {
          setState({ x: e as number });
        }}
      />
    </Card>
  );
};

export default Demo;
