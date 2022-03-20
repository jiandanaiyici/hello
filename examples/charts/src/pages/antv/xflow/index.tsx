/**
 * @description: Xflow demo
 * @name: XFlowDemo
 */
import React, { useState } from 'react';
import { Button, Card, Divider, Form, Select } from 'antd';

import { FaultTree, FaultTreeEditPanel } from './fault-tree';
import { getGraphData, BASE_LINK, GRID_OPTIONS, LayoutTypes } from './mock';

const graphData = getGraphData();

export default () => {
  const [value, setValue] = useState<LayoutTypes>('dagre');

  return (
    <Card
      title="示例演示"
      extra={
        <Button
          href="https://www.yuque.com/jiandanaiyici/fyo5tk/elm3di"
          target="_blank"
          type="link"
        >
          参考文档
        </Button>
      }
    >
      <Form size="small">
        <Form.Item
          label={
            <Button type="link" target="_blank" href={`${BASE_LINK}/${value}`}>
              布局方式
            </Button>
          }
        >
          <Select<LayoutTypes>
            value={value}
            options={GRID_OPTIONS}
            style={{ width: 200 }}
            onChange={(val) => {
              setValue(val);
            }}
          />
        </Form.Item>
      </Form>
      <Divider />
      <FaultTree graphData={graphData} layoutType={value}>
        <FaultTreeEditPanel
          defaultCollpased
          header="header"
          footer="footer"
          position={{ width: undefined, top: 40, bottom: 0, right: 0, left: 0 }}
        >
          <pre>{JSON.stringify(GRID_OPTIONS, null, 2)}</pre>
        </FaultTreeEditPanel>
      </FaultTree>
    </Card>
  );
};
