import React, { SFC } from 'react';
import styles from './index.less';

export interface TickData {
  id: string | number;
  text: string;
}

export interface ScaleLineProps {
  /** 间隔 */
  ticks?: TickData[];
}

const ScaleLine: SFC<ScaleLineProps> = (props) => {
  const { ticks = [] } = props;

  return (
    <div className={styles.wrapper}>
      {ticks.map((item) => (
        <span className={styles.tick} key={item.id}>
          {item.text}
        </span>
      ))}
    </div>
  );
};

export default ScaleLine;
