/**
 * 自定义基础组件
 */
// @ts-nocheck
import React, { useRef, useEffect, useState, Fragment, useMemo } from 'react';
import { Scene } from '@antv/l7';
import useMapConfig from './useMapConfig';

import { BasicInt } from './interface';
import { Spin } from 'antd';

const basicStyle = {
  // position: 'absolute',
  // height: '100%',
  // width: '100%',
  // top: 0,
  // bottom: 0,
};

const BasicScene = React.memo((props: BasicInt) => {
  const { map, option, onSceneLoaded } = props;
  const [loading, setLoading] = useState(true);
  const sceneRef = useRef<Scene | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ints = new Scene({
      id: containerRef.current as HTMLDivElement,
      ...option,
      map,
    });

    ints.on('loaded', () => {
      sceneRef.current = ints;
      setLoading(false);

      if (onSceneLoaded) {
        onSceneLoaded(ints);
      }
    });

    return () => {
      if (sceneRef.current) {
        return sceneRef.current.destroy();
      }
    };
  }, []);

  useMapConfig(sceneRef.current, map);
  const lastStyle = useMemo(() => ({ ...basicStyle, ...props.style }), [props.style]);

  return (
    <div style={lastStyle} className={props.className} ref={containerRef}>
      {props.children}
      {/* {loading ? <Spin tip="地图加载中, 请稍后" /> : <Fragment> {props.children}</Fragment>} */}
    </div>
  );
});

export default BasicScene;
