/* eslint-disable no-param-reassign */
import { convertToPinyin } from 'tiny-pinyin';
import baseData from '@/components/CityCascader/data.json';

import { isEmptyArray } from './util';

const hotList = ['北京市', '上海市', '深圳', '广州市'];

const formatData = (data: any) => ({
  value: convertToPinyin(data.name),
  label: data.name,
  isHot: hotList.includes(data.name),
  children: data.children,
});

const transformData = (data: any[]) => {
  return data.reduce((prev, next) => {
    if (!isEmptyArray(next.children)) {
      next.children = next.children.map((item: any) => formatData(item));
      return prev.concat(formatData(next));
    }

    return prev.concat(formatData(next));
  }, [] as any[]);
};

export const data = transformData(baseData);

export const hotData = data
  .filter((item: any) => item.isHot)
  .map((item: any) => ({
    label: item.label,
    value: item.value,
  }));
