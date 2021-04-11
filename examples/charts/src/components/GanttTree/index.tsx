import React, { FC, Fragment, useMemo } from 'react';
import { Tag, Collapse, Empty, Popover, Spin } from 'antd';
import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';

import { GanttTreeProps } from './interface';
import LabelContent from './LabelContent';
import { TYPE_COLORS } from './contant';
import ScaleLine from './ScaleLine';
import styles from './index.less';
import { getLineTicks } from './helper';
import ChartContent from './ChartContent';
import TagHeader from './TagHeader';

const { Panel } = Collapse;

const GanttTree: FC<GanttTreeProps> = (props) => {
  const { loading, dataSource = [], startDate, endDate } = props;
  const tickes = useMemo(() => getLineTicks(startDate, endDate), [startDate, endDate]);

  return (
    <Spin style={{ width: '100%' }} spinning={loading}>
      {dataSource?.length > 0 ? (
        <Fragment>
          {dataSource.map((item, index) => (
            <Fragment key={item.name}>
              <Collapse
                defaultActiveKey={index === 0 ? [item.name] : []}
                bordered={false}
                expandIcon={(panelProps) =>
                  panelProps.isActive ? <MinusSquareOutlined /> : <PlusSquareOutlined />
                }
              >
                <Panel
                  header={
                    <LabelContent title={item.name} content={<TagHeader dataSource={item.hot} />} />
                  }
                  key={item.name}
                >
                  {item.children.map((item) => (
                    <LabelContent
                      className={styles.gantt_wrapper}
                      title={item.title}
                      key={item.key}
                      // 左右 offset
                      content={<ChartContent dataSource={item.children} />}
                    />
                  ))}
                  <LabelContent content={<ScaleLine ticks={tickes} />} />
                </Panel>
              </Collapse>
            </Fragment>
          ))}
        </Fragment>
      ) : (
        <Empty />
      )}
    </Spin>
  );
};

GanttTree.defaultProps = {
  loading: false,
};

export default GanttTree;
