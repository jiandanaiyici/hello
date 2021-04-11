import React, { ReactNode, SFC } from 'react';
import styles from './index.less';

export interface LabelContentProps {
  title?: ReactNode;
  content?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const LabelContent: SFC<LabelContentProps> = (props) => {
  const { title, content, style, className } = props;
  
  return (
    <div className={className ? `${styles.wrapper} ${className}` : styles.wrapper} style={style}>
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>{content}</div>
    </div>
  );
};

export default LabelContent;
