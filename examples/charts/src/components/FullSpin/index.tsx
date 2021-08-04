import React, { ReactNode } from 'react';

import { Spin } from 'antd';
import styles from './index.less';

interface FullSpinProps {
  loading?: boolean;
  children?: ReactNode;
}

const FullSpin = React.memo<FullSpinProps>(props => {
  return (
    <Spin spinning={props.loading} className={styles.wrapper}>
      {props.children}
    </Spin>
  );
});

export default FullSpin;
