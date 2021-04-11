import React, { FC, useMemo, useRef } from 'react';
import { ChildData } from '../interface';
import styles from './index.less';
import { getChartTicks } from '../helper';
import { TYPE_COLORS } from '../contant';
import { useObserverRect } from '@/hooks';
import { useSize } from 'ahooks';
import { Popover } from 'antd';

export interface ProcessChartData extends ChildData {
  /** 左侧偏移刻度 */
  offsetX: number;
  right?: number;
}

export interface ChartContentProps {
  width?: number;
  dataSource: ProcessChartData[];
}

const BASE_WITHD = 12;

export interface ChartItemProps {
  data: ProcessChartData;
  color?: string;
}

const ChartItem: FC<ChartItemProps> = (props) => {
  const { data } = props;
  const { offsetX } = data;

  const color = useMemo(() => TYPE_COLORS[data.type], [data.type]);
  const ticks = useMemo(() => getChartTicks(data.startDate, data.endDate), [data]);

  return (
    <Popover title="a" content={<pre>{JSON.stringify(data, null, 2)}</pre>}>
      <span
        className={styles.chart_item}
        style={{
          color,
          width: BASE_WITHD * ticks,
          height: BASE_WITHD,
          transform: `translateX(${offsetX * BASE_WITHD}px)`,
        }}
      />
    </Popover>
  );
};

const ChartContent: FC<ChartContentProps> = (props) => {
  const { dataSource = [] } = props;
  const domRef = useRef(null);
  const rect = useSize(domRef.current);
  // const [domRef, rect] = useObserverRect<HTMLDivElement>();

  return (
    <div ref={domRef} className={styles.chart_list}>
      {dataSource.map((item) => (
        <ChartItem key={item.topicName} data={item} />
      ))}
    </div>
  );
};

export default ChartContent;
