/**
 * 地图容器
 */
import React, { ReactNode, useMemo, useRef } from 'react';
import cs from 'classnames';
import { useSetState, useSize } from 'ahooks';

import ErrorBoundary from '../ErrorBoundary';
import { MapCardContext } from './context';
import styles from './index.less';

export interface MapCardProps<T extends object> extends BasicNodeProps {
  header?: ReactNode;
  children?: ReactNode | ReactNode[];
  config?: StateType | T;
  justify?: JustifyType;
  direction?: DirectionType;
}

const MapCard = <T extends object>(props: MapCardProps<T>) => {
  const { justify = 'start', direction = 'column' } = props;
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { height, width } = useSize(wrapperRef);

  const [config, setConfig] = useSetState<StateType | T>(props.config);
  const kls = useMemo(
    () =>
      cs(styles.wrapper, props.className, {
        [styles[justify]]: justify,
        [styles[direction]]: direction,
      }),
    [props.className, props.direction, props.justify],
  );
  const bodyKls = useMemo(() => cs(styles.card_body, props.bodyClsName), [props.bodyClsName]);

  /** 无法注入到子组件 */
  // const children = React.Children.map(props.children, (child) => {
  //   return React.cloneElement(child as any, {
  //     config,
  //   });
  // });

  return (
    <MapCardContext.Provider value={{ config, setConfig }}>
      <div className={kls} style={props.style}>
        {props.header && (
          <div className={styles.card_header} style={props.headerStyle}>
            {props.header}
          </div>
        )}
        <div ref={wrapperRef} className={bodyKls} style={{ height, width, ...props.bodyStyle }}>
          <ErrorBoundary>{props.children}</ErrorBoundary>
        </div>
      </div>
    </MapCardContext.Provider>
  );
};

export default MapCard;
