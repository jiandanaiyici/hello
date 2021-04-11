import React, { useMemo, SFC, ReactNode } from 'react';
import cs from 'classnames';
import { DownOutlined } from '@ant-design/icons';

import styles from './index.less';

export interface LabelFilterProps {
  className?: string;
  /** 是否打开 */
  opened?: boolean;
  /** 前缀描述 */
  prefixDesc?: ReactNode;
  /** 内容 */
  content?: ReactNode;
  /** 支持清除 */
  allowClear?: boolean;
}

const LabelFilter: SFC<LabelFilterProps> = (props) => {
  const kls = useMemo(
    () =>
      cs(styles.wrapper, props.className, {
        [styles.opened]: props.opened,
      }),
    [props.opened, props.className],
  );

  return (
    <span className={kls}>
      {props.prefixDesc && <span className={styles.prefix}>{props.prefixDesc}</span>}
      <div className={styles.value}>{props.content}</div>
      <span className={styles.icon}>
        <DownOutlined />
      </span>
    </span>
  );
};

LabelFilter.defaultProps = {
  opened: false,
  prefixDesc: '占位',
  allowClear: true,
};

export default LabelFilter;
