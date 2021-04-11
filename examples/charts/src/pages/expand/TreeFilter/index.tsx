/**
 * todo
 * 1. 支持自定义渲染 tag 内容 及 disabled
 * 2. 修改渲染 tab 列表为 check 类型, 支持单多选
 * 3. 清空选中 value 时回调
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useMemo, ReactNode, SFC, Fragment } from 'react';
import { Tag, Input, Space, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import cs from 'classnames';
import { useSetState } from 'ahooks';

import { isEmptyArray } from './util';
import TranslateBorder from '../animates/TranslateBorder';

import styles from './index.less';

export interface TreeFilterProps<T extends object = any> {
  /** 容器 className */
  wrapperCls?: string;
  /** 容器 样式 */
  wrapperStyle?: React.CSSProperties;
  /** 数据来源 */
  dataSource: T[];
  /** 是否展示搜索 */
  showSearch?: boolean;
  /** 热门 */
  hotData?: T[];
  hotOptions?: Omit<LabelContentProps, 'children'>;
}

export interface CardProps<T extends object = any> {
  showSearch?: boolean;
  dataSource?: T[];
}

export interface LabelContentProps {
  children?: ReactNode;
  label?: ReactNode;
  /** 是否展示 冒号 */
  colon?: boolean;
  labelWidth?: number;
}

const LabelContent: SFC<
  LabelContentProps & {
    className?: string;
  }
> = (props) => {
  const labelKls = useMemo(
    () =>
      cs(styles.label, {
        [styles.colon]: props.colon,
      }),
    [props.colon],
  );

  return (
    <div
      className={
        props.className ? `${styles.label_content} ${props.className}` : `${styles.label_content}`
      }
    >
      {props.label && (
        <div className={labelKls} style={{ width: props.labelWidth }}>
          {props.label}
        </div>
      )}
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

LabelContent.defaultProps = {
  colon: true,
};

const SelectTagGroup = () => {
  return (
    <Fragment>
      <Tag closable>1111</Tag>
    </Fragment>
  );
};

const Card: FC<CardProps> = (props) => {
  const [state, setState] = useSetState({
    /** search */
    value: '',
  });

  // const filteredData = useMemo(
  //   // @ts-ignore
  //   () => arrayTreeFilter<any>(props.dataSource, (item) => item.label.includes(state.value)),
  //   [props.dataSource, state.value],
  // );

  // console.log(filteredData, 'filteredData>>>>>>>>>>>>>');

  const { dataSource } = props;
  return (
    <div className={styles.filter_card}>
      <TranslateBorder>
        <div className={styles.filter_header}>
          <div className={styles.filter_value}>
            <SelectTagGroup />
          </div>
          {props.showSearch && (
            <Input
              allowClear
              size="small"
              placeholder="请输入搜索"
              prefix={<SearchOutlined />}
              className={styles.search}
              // onChange={(evt) => {
              //   console.log(evt.target.value);
              // }}
              onPressEnter={(evt: any) => {
                setState({ value: evt.target.value });
              }}
            />
          )}
        </div>
      </TranslateBorder>
      <div className={styles.filter_body}>
        {dataSource?.map((item) => (
          <Tag
            onClick={() => {
              message.success(
                '这里需要换成 CheckableTag 且不允许多选, 且需要控制点击后自动切换到子集数据',
              );
            }}
          >
            {item.label}
          </Tag>
        ))}
      </div>
    </div>
  );
};

Card.defaultProps = {
  showSearch: true,
};

const TreeFilter: FC<TreeFilterProps> = (props) => {
  const [state, setState] = useSetState({
    value: '',
  });
  console.log(props.dataSource, props.hotData, '>>>>>>>>>>>>>>>>');
  const wrapperKls = useMemo(() => cs(styles.wrapper, props.wrapperCls), [props.wrapperCls]);
  const showHot = useMemo(() => !isEmptyArray(props.hotData), [props.hotData]);

  return (
    <div className={wrapperKls} style={props.wrapperStyle}>
      <LabelContent className={styles.select_wrapper} labelWidth={200} label="当前选中">
        <span className={styles.select_value}>{state.value}</span>
      </LabelContent>
      <LabelContent labelWidth={200} label="选中占位">
        内容占位
      </LabelContent>
      {showHot && (
        <LabelContent labelWidth={props.hotOptions?.labelWidth} label={props.hotOptions?.label}>
          <Space>
            {props.hotData?.map((item) => (
              <span
                className={styles.hot_item}
                key={item.value}
                onClick={() => {
                  setState({ value: item.label });
                }}
              >
                {item.label}
              </span>
            ))}
          </Space>
        </LabelContent>
      )}
      <Card dataSource={props.dataSource} />
    </div>
  );
};

TreeFilter.defaultProps = {
  showSearch: false,
  hotData: [1],
  hotOptions: {
    label: '热门',
    colon: true,
    labelWidth: 200,
  },
};

export default TreeFilter;
