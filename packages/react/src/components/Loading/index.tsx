import React, { SFC, ReactNode } from 'react';

import styles from './index.module.css';

export interface Iprops {
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
  /** 是否加载状态 */
  spinning?: boolean;
  indicator?: ReactNode;
}

const Loading: SFC<Iprops> = (props) => {
  const loadKls = props.spinning ? `${styles.loading} ${styles.spinning}` : styles.loading;

  if (!props.spinning) return null;

  return (
    <div className={styles.wrapper}>
      <div className={loadKls}>
        <div className={styles.item}>G</div>
        <div className={styles.item}>N</div>
        <div className={styles.item}>I</div>
        <div className={styles.item}>D</div>
        <div className={styles.item}>A</div>
        <div className={styles.item}>O</div>
        <div className={styles.item}>L</div>
      </div>
      {/* {props.children && <div className={styles.content}>{props.children}</div>} */}
    </div>
  );
};

Loading.defaultProps = {
  spinning: true,
};

export default Loading;
