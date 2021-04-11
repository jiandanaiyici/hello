/**
 * 城市级联选择
 */

import React, { FC } from 'react';
import { Cascader } from 'antd';
import { omit } from 'lodash';
import { CascaderProps } from 'antd/lib/cascader';
import data from './data.json';

export type CityCascaderProps = Omit<CascaderProps, 'options' | 'placeholder' | 'fieldNames' | 'allowClear'>;
export type CityItemData = {
  name: string;
  lng: string;
  lat: string;
  children?: CityItemData[];
};

const CityCascader: FC<CityCascaderProps> = (props) => {
  return (
    <Cascader
      options={data}
      placeholder="请选择"
      allowClear={false}
      fieldNames={{ label: 'name', value: 'name', children: 'children' }}
      {...omit(props, ['options', 'fieldNames', 'allowClear'])}
    />
  );
};

export default CityCascader;
