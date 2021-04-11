import React, { FC, ReactNode } from 'react';
import styles from './index.less';

export interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = (props) => {
  return <div className={styles.container}>{props.children}</div>;
};

export default Container;
