/**
 * todo:
 * 1. 动态计算 border 容器宽度 和 高度
 * 2. 动态计算 x 偏移量(根据获取到最后一个选中回填值的位置)
 */

import React, { ReactNode, FC } from 'react';
import Tween from 'rc-tween-one';

import styles from './index.less';

export interface TranslateBorderProps {
  children?: ReactNode;
  x?: number;
}

const Border = () => {
  return <div className={styles.border_wrapper} />;
};

const TranslateBorder: FC<TranslateBorderProps> = (props) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <Tween animation={{ x: props.x }} component={Border} />
      </div>
      <div className={styles.translate_body}>{props.children}</div>
    </div>
  );
};

TranslateBorder.defaultProps = {
  x: 300,
};

export default TranslateBorder;
