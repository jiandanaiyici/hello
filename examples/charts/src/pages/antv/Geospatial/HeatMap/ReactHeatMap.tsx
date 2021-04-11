/** react 版本 */

import React, { Fragment, useEffect } from 'react';
import { Select, Divider } from 'antd';
import Editor from '@monaco-editor/react';
import { AMapScene, HeatmapLayer } from '@antv/l7-react';

// import useQueryData from '@/hooks/useQueryData';
import MapCard from '@/components/MapCard';
import { useSetState } from 'ahooks';
import heatData from '@/mockData/heatMap/json';
import { directionList, justifyList } from './contants';

// import { queryGeoHeatDataService } from './service';

const errCode = `<HeatmapLayer
key="1"
source={{
  data: heatData,
  parser: {
    type: 'json',
    x: 'lng',
    y: 'lat',
    field: 'count',
  },
}}
size={{
  field: 'count',
  values: [0, 1],
}}
color={{
  values: ['#FF4818', '#F7B74A', '#FFF598', '#91EABC', '#2EA9A1', '#206C7C'].reverse(),
}}
shape={{
  value: 'heatmap',
}}
style={{
  opacity: 1.0,
  radius: 15,
  intensity: 4,
  rampColors: {
    colors: [
      '#FF4818',
      '#F7B74A',
      '#FFF598',
      '#91EABC',
      '#2EA9A1',
      '#206C7C',
    ].reverse(),
    positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
  },
}}
/>
`;

const HeatMapWithReact = React.memo(() => {
  // const [geoData, setGeoData] = useState();
  // const [baseData, queryHeatData] = useQueryData(queryHeatDataService, []);
  // const queryGeoHeatData = async () => {
  //   const data = await queryGeoHeatDataService();
  //   setGeoData(data);
  // };

  useEffect(() => {
    // queryGeoHeatData();
    // queryHeatData();
  }, []);

  return (
    <MapCard
      direction="row"
      header={
        <Fragment>
          <Editor
            language="json"
            height={350}
            width={300}
            theme="dark"
            value={JSON.stringify(heatData, null, 2)}
          />
          <Divider />
          <span>报错: generateColorRamp postions of undefined colors</span>
          <Editor theme="dark" height={300} width={300} value={errCode} />
        </Fragment>
      }
    >
      <AMapScene
        option={{ logoVisible: false, animate: true }}
        map={{
          center: [110.19382669582967, 50.258134],
          // pitch: 0,
          style: 'dark',
          zoom: 1,
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {heatData && (
          <HeatmapLayer
            key="1"
            source={{
              data: heatData,
              parser: {
                type: 'json',
                x: 'lng',
                y: 'lat',
                field: 'count',
              },
            }}
            size={{
              field: 'count',
              values: [0, 1],
            }}
            color={{
              values: ['#FF4818', '#F7B74A', '#FFF598', '#91EABC', '#2EA9A1', '#206C7C'].reverse(),
            }}
            shape={{
              value: 'heatmap',
            }}
            style={{
              opacity: 1.0,
              radius: 15,
              intensity: 4,
              rampColors: {
                colors: [
                  '#FF4818',
                  '#F7B74A',
                  '#FFF598',
                  '#91EABC',
                  '#2EA9A1',
                  '#206C7C',
                ].reverse(),
                positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
              },
            }}
          />
        )}
        {/* {geoData && (
          <HeatmapLayer
            key="1"
            source={{
              data: geoData,
              transforms: [
                {
                  type: 'hexagon',
                  size: 500000,
                  field: 'capacity',
                  method: 'sum',
                },
              ],
            }}
            color={{
              values: 'rgb(221,230,238)',
            }}
            shape={{
              values: 'hexagon',
            }}
            style={{
              coverage: 0.7,
              angle: 0.3,
              opacity: 0.8,
            }}
          />
        )} */}
      </AMapScene>
    </MapCard>
  );
});

const ReactHeatMap = React.memo(() => {
  const [state, setState] = useSetState<{
    justify?: JustifyType;
    direction?: DirectionType;
  }>({
    justify: 'start',
    direction: 'column',
  });

  return (
    <MapCard
      {...state}
      config={{ a: '111' }}
      header={
        <Fragment>
          <span>布局方向: </span>
          <Select
            style={{ width: 130 }}
            value={state.direction}
            onChange={(v) => {
              setState({ direction: v });
            }}
          >
            {directionList.map((item) => (
              <Select.Option value={item.value} key={item.key}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
          <span>布局: </span>
          <Select
            style={{ width: 130 }}
            value={state.justify}
            onChange={(v) => {
              setState({ justify: v });
            }}
          >
            {justifyList.map((item) => (
              <Select.Option value={item.value} key={item.key}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Fragment>
      }
    >
      <HeatMapWithReact />
    </MapCard>
  );
});

export default ReactHeatMap;
