import React, { useEffect, useMemo } from 'react';
import { Card } from 'antd';
import { DualAxes } from '@ant-design/charts';
import type { DualAxesConfig } from '@ant-design/charts';
import { useQuery } from '@/hooks';

const baseYear = 1999;
const years = Array(10)
  .fill(1)
  .map((_, index) => baseYear + index);
const aData = years.map((item) => Number((item * Math.random()).toFixed(2)));
const bData = years.map((item) => Number((item * Math.random()).toFixed(2)));
const cData = years.map((_item, index) =>
  Number((Math.random() * index).toFixed(2)),
);

interface SerieData {
  name: string;
  data: number[];
}

interface ChartData {
  series: SerieData[];
  xAixs: number[];
}

const oldData = {
  series: [
    {
      name: 'A',
      data: aData,
    },
    {
      name: 'B',
      data: bData,
    },
    {
      name: 'C',
      data: cData,
    },
  ],
  xAixs: years,
};

function transformData(data: ChartData) {
  const list = data.series.reduce(
    (prev: any, next: { name: string; data: { [x: string]: any } }) => {
      const prevData = { ...prev };
      const valueType = next.name === 'C' ? 'count' : 'value';
      prevData[next.name] = data.xAixs.map((year, index) => {
        return {
          year,
          type: next.name,
          [valueType]: next.data[index],
        };
      });
      return prevData;
    },
    {} as Record<string, any>,
  );

  const left = list.A?.concat(list.B) ?? [];
  const right = list.C ?? [];

  return { left, right };
}

function queryListData() {
  return new Promise((resolve) => setTimeout(resolve, 1000, oldData));
}

const texts = {
  A: '孙',
  B: '难',
  C: '难',
};

const colors = {
  A: 'purple',
  B: 'yellow',
  C: 'green',
};

const DoubleYChart: React.FC = () => {
  const [result, query, loading] = useQuery<ChartData>(queryListData, {
    series: [],
    xAixs: [],
  });

  useEffect(() => {
    query();
  }, []);

  const data = useMemo(() => transformData(result), [result]);

  const { left, right } = data;

  const config: DualAxesConfig = {
    data: [left, right],
    xField: 'year',
    yField: ['value', 'count'],
    tooltip: {
      formatter: (datum) => {
        const name = texts[datum.type];
        const value =
          datum.type === 'C'
            ? `${(datum.count * 100).toFixed(2)}%`
            : `${datum.value}块`;
        return { name, value };
      },
    },
    legend: {
      marker: {
        symbol: 'diamond',
      },
    },
    xAxis: {
      // grid: {
      //   alignTick: true,
      // },
      label: {
        autoRotate: true,
        offset: 10,
      },
      title: {
        text: 'X轴',
      },
    },
    yAxis: {
      value: {
        min: 0,
        title: {
          text: '你有多少钱',
        },
      },
      count: {
        min: 0,
        title: {
          text: '老子很穷',
        },
        label: {
          formatter(v: any) {
            return Number((v * 100).toFixed(2));
          },
        },
      },
    },
    meta: {
      type: {
        formatter(x: any) {
          return texts[x];
        },
      },
    },
    theme: 'dark', // dark | light
    slider: {
      start: 0,
      end: 1,
      height: 15,
    },
    geometryOptions: [
      {
        geometry: 'line',
        smooth: true,
        seriesField: 'type',
        color: ({ type }: any) => {
          return colors[type];
        },
      },
      {
        geometry: 'line',
        seriesField: 'type',
        smooth: true,
        color: colors.C,
      },
    ],
  };

  return (
    <Card bodyStyle={{ padding: 24 }} title="双Y轴折线图">
      <DualAxes loading={loading} {...config} />
    </Card>
  );
};

export default DoubleYChart;
