import React from 'react';
import { Button, Form, Checkbox, InputNumber } from 'antd';
import { cloneFnList, randomObject } from './helper';

const radioOptions = cloneFnList.map(({ key, label }) => ({
  key,
  value: key,
  label: label.text,
}));

const Performance = () => {
  return (
    <Form size="small">
      <Form.Item label="选择类型">
        <Checkbox.Group options={radioOptions} />
      </Form.Item>
      <Form.Item label="设置 Deep">
        <InputNumber min={1} />
      </Form.Item>
      <Button>Start</Button>
    </Form>
  );
};

export default Performance;
