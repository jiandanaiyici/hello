/**
 * 全屏容器
 */

import React, { ReactNode, FC, useRef } from 'react';
import { useSize, useFullscreen } from 'ahooks';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';

import styles from './index.less';

export interface Iprops {
  children: ReactNode;
  /** 是否允许全屏 */
  full?: boolean;
}

const FullWrapper: FC<Iprops> = (props) => {
  const fullRef = useRef<HTMLDivElement | null>(null);
  /** 设置全屏 */
  const [isFull, { setFull, exitFull }] = useFullscreen(() => fullRef.current);
  const { height } = useSize(document.body);

  return (
    <div ref={fullRef} className={styles.wrapper} style={{ height }}>
      {/* 是否允许全屏 */}
      {props.full && (
        <span className={styles.full_wrapper}>
          {isFull ? (
            <FullscreenExitOutlined onClick={exitFull} />
          ) : (
            <FullscreenOutlined onClick={setFull} />
          )}
        </span>
      )}
      {props.children}
    </div>
  );
};

FullWrapper.defaultProps = {
  full: true,
};

export default FullWrapper;
