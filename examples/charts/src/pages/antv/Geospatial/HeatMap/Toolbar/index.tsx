import React, { FC } from 'react';
import { Form, Switch, Select } from 'antd';
import CityCascader from '@/components/CityCascader';

import styles from './index.less';
import { layerTypeList, mapStyleList } from '../contants';

const { Option } = Select;

export interface HeatToolBarprops {
  state: HeatMapInt.ControlState;
  setState: any;
}

const HeatToolBar: FC<HeatToolBarprops> = (props) => {
  const { state } = props;

  return (
    <Form layout="inline" className={styles.toolbar}>
      <Form.Item label="缩放">
        <Switch
          size="small"
          checked={state.zoom}
          onChange={(v) => {
            props.setState({ zoom: v });
          }}
        />
      </Form.Item>
      <Form.Item label="比例尺">
        <Switch
          size="small"
          checked={state.scale}
          onChange={(v) => {
            props.setState({ scale: v });
          }}
        />
      </Form.Item>
      <Form.Item label="图层类型">
        <Select
          allowClear
          size="small"
          style={{ width: 100 }}
          value={state.shapeType}
          onChange={(v) => {
            props.setState({ shapeType: v });
          }}
        >
          {layerTypeList.map((item) => (
            <Option key={item.key} value={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="选择区域">
        <CityCascader
          size="small"
          onChange={(value, selectedOptions) => {
            props.setState({ city: value, cityPos: selectedOptions });
          }}
        />
      </Form.Item>
      <Form.Item label="地图样式">
        <Select
          value={state.exportType}
          style={{ width: 100 }}
          size="small"
          onChange={(v) => {
            props.setState({ mapStyle: v });
          }}
        >
          {mapStyleList.map((item) => (
            <Option key={item.key} value={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
      {/* <Form.Item label="导出图片">
        <Select
          value={state.exportType}
          style={{ width: 100 }}
          size="small"
          onChange={(v) => {
            props.setState({ exportType: v });
          }}
        >
          {exportImageList.map((item) => (
            <Option key={item.key} value={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
        mapStyleList
      </Form.Item> */}
    </Form>
  );
};

export default HeatToolBar;
