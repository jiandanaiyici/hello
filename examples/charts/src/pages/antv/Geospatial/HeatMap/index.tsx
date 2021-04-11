/**
 * 热力图
 */
import React from 'react';
import { useSetState } from 'ahooks';
import { Drawer } from 'antd';
// import BasicScene from '@/components/Custom/BasicScene';

import MapCard from '@/components/MapCard';
import FullWrapper from './FullWrapper';
import HeatToolBar from './Toolbar';
import Container from './Container';
import BasicHeatMap from './BasicHeatMap';
import ClickInfo from './ClickInfo';
// import ViewData from './ViewData';

const HeatMap = () => {
  const [info, setInfo] = useSetState<HeatMapInt.ClickInfo>({
    visible: false,
    target: null,
  });
  const [state, setState] = useSetState<HeatMapInt.ControlState>({
    /** 缩放 */
    zoom: false,
    /** 比例尺 */
    scale: false,
    /** 选择区域 */
    city: [],
    /** 区域坐标 */
    cityPos: [],
    /** 网格图 | 热力图 | 行政图 */
    shapeType: 'heat',
    /** 导出图片类型 */
    exportType: undefined,
    mapStyle: 'normal',
  });

  /** 测试 */
  return (
    <MapCard config={{ aa: '111'}}>
      <FullWrapper>
        <HeatToolBar state={state} setState={setState} />
        {/* <ViewData /> */}
        <Container>
          <BasicHeatMap setInfo={setInfo} {...state} />
        </Container>
      </FullWrapper>
      <Drawer
        visible={info.visible}
        title="点击事件 获取的数据有误差"
        width={700}
        destroyOnClose
        onClose={() => {
          setInfo({ visible: false, target: null });
        }}
      >
        <ClickInfo target={info.target} />
      </Drawer>
    </MapCard>
  );
};

export default HeatMap;
