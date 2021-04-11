/**
 * 查看数据
 */
import React, { ReactNode, useRef } from 'react';
import CSSMotion from 'rc-motion';
import classNames from 'classnames';
// import TweenOne from 'rc-tween-one';
import { Button } from 'antd';
import { useSetState, useSize } from 'ahooks';

import styles from './index.less';

export interface WrapperProps {
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
  title?: ReactNode;
}

const Wrapper = React.forwardRef((props: WrapperProps, ref: any) => (
  <div ref={ref} style={props.style} className={`${props.className} ${styles.wrapper}`}>
    {props.title && <div className={styles.header}>{props.title}</div>}
    <div className={styles.content}>{props.children}</div>
  </div>
));

const ViewData = () => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useSetState({
    hasMotionClassName: true,
    removeOnLeave: false,
  });
  const { width } = useSize(divRef.current);

  const onCollapse = () => ({ left: width ? -width : 300 });

  return (
    <div>
      <Button
        onClick={() => {
          setState((prevState) => ({
            hasMotionClassName: !prevState.hasMotionClassName,
          }));
        }}
      >
        展开
      </Button>
      <CSSMotion
        visible={false}
        motionName={state.hasMotionClassName ? styles.transition : undefined}
        removeOnLeave={state.removeOnLeave}
        leavedClassName="transition"
        onLeaveActive={onCollapse}
        motionLeaveImmediately
      >
        {({ style, className, internalRef }, ref) => {
          return (
            <Wrapper
              ref={internalRef}
              className={classNames(styles['demo-block'], className)}
              style={{ ...style }}
            >
              11111111111
            </Wrapper>
          );
        }}
      </CSSMotion>
    </div>
  );
};

export default ViewData;
