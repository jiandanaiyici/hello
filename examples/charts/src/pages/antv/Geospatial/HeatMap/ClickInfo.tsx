/**
 * 点击事件获取的信息
 */
import React, { SFC, useEffect } from 'react';
import { Descriptions } from 'antd';
import { useSetState } from 'ahooks';

export interface ClickInfoProps {
  target: HeatMapInt.MapTarget;
}

const ClickInfo: SFC<ClickInfoProps> = (props) => {
  const { target } = props;
  const [state, setState] = useSetState<HeatMapInt.DetailInfo>({} as HeatMapInt.DetailInfo);

  useEffect(() => {
    if (target) {
      target.getCity((d: HeatMapInt.CityDataInfo) => {
        setState({ city: d });
      });

      setState({
        zoom: target.getZoom(),
        pitch: target.getPitch(),
        bounds: target.getBounds(),
        scale: target.getScale(),
        center: target.getCenter(),
        style: target.getMapStyle(),
        labelIndex: target.getLabelzIndex(),
      });
    }
  }, [target]);

  return (
    <Descriptions column={1} bordered size="small">
      <Descriptions.Item label="缩放等级">{state.zoom}</Descriptions.Item>
      <Descriptions.Item label="地图比例尺">{state.scale}</Descriptions.Item>
      <Descriptions.Item label="获取俯仰角">{state.pitch}</Descriptions.Item>
      <Descriptions.Item label="地图标注的显示顺序">{state.labelIndex}</Descriptions.Item>
      <Descriptions.Item label="中心点">
        <pre>{JSON.stringify(state.center, null, 2)}</pre>
      </Descriptions.Item>
      <Descriptions.Item label="中心点所在区域">
        <pre>{JSON.stringify(state.city, null, 2)}</pre>
      </Descriptions.Item>
      <Descriptions.Item label="当前可视区域">
        <pre>{JSON.stringify(state.bounds, null, 2)}</pre>
      </Descriptions.Item>
      <Descriptions.Item label="获取地图显示样式">
        {JSON.stringify(state.style, null, 2)}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default ClickInfo;
