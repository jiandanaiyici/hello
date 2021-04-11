/**
 * 基础地图
 * @todo
 * 1. 自定义引用插件 通过图层方式添加到图表
 * 2. 绘制多边形边界
 * 3. 数据转换格式
 * 4. 热力图加载数据, 又失效了(数据有, 未添加至图层上)
 */
import React, { useEffect, FC, useRef, useState, useMemo } from 'react';
import { Scene } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import { usePrevious } from 'ahooks';

import useQueryData from '@/hooks/useQueryData';
import heatMapJsonData from '@/mockData/heatMap/json';
import { CityItemData } from '@/components/CityCascader';

import {
  popup,
  marker,
  // fullControl,
  // zoomControl,
  // scaleControl,
  // createFullElement,
} from './controls';

import { queryHeatDataService } from './service';
import { pLayer, heatLayer } from './layer';


/** 创建地图实例 */
const createMapInts = () =>
  new GaodeMap({
    style: 'amap://styles/2a09079c3daac9420ee53b67307a8006?isPublic=true',
    center: [116.418261, 39.921984],
    // pitch: 0,
    zoom: 3,
    /** 缩放最小等级 */
    minZoom: 3,
    /** 缩放最大等级 */
    maxZoom: 16,
    token: '28d49c5ed2fdca7f35efe4d1a32e6ec7',
    /** 仰视角度 */
    // rotation: 0,
    /** 插件 */
    plugin: ['AMap.ToolBar', 'AMap.Autocomplete', 'AMap.Geolocation'],
  });

const BasicHeatMap: FC<HeatMapInt.ControlState & { setInfo: any }> = React.memo((props) => {
  const sceneInts = useRef<Scene | null>(null);
  const [loaded, setLoaded] = useState(false);
  const prevCityPos = usePrevious<CityItemData[]>(props.cityPos);
  const [result, query] = useQueryData(queryHeatDataService);

  useEffect(() => {
    query();
  }, []);

  useEffect(() => {
    const scene = new Scene({
      id: 'map',
      logoVisible: false,
      preserveDrawingBuffer: true,
      map: createMapInts(),
    });

    scene.on('loaded', () => {
      sceneInts.current = scene;
      setLoaded(true);
      scene.on('click', (evt) => {
        const { target = {} } = evt;
        // const center = target.getCenter();
        // scene.setCenter([center.lng, center.lat]);
        // scene.fitBounds(target.getBounds())
        props.setInfo({ target, visible: true });
      });
    });

    return () => {
      if (sceneInts.current) {
        /** 移除所有事件 */
        // sceneInts.current.off('click', () => {});
        /** 移除所有图层 */
        // sceneInts.current.removeAllLayer();
        sceneInts.current.destroy();
      }
    };
  }, []);

  /** 高德地图 和 echarts 坐标数据有差距 */
  /**
   * 1. 记录上一次的位置
   * 2. 根据上一次的位置绘制路线图, 需要记录完整的路线(双向链表 ? 同时带有箭头方向)
   */
  useEffect(() => {
    if (
      prevCityPos &&
      props.cityPos.length > 0 &&
      prevCityPos !== props.cityPos &&
      sceneInts.current
    ) {
      /** 最终选择的区县 */
      const currentPos = props.cityPos[props.cityPos.length - 1];
      /** 当前城市 */
      const cityPos = props.cityPos[0];
      const { log, lat, name } = currentPos;
      const { children = [] } = cityPos as CityItemData;
      const cityPolygonData = children.map((item) => ({
        lng: Number(item.lng),
        lat: Number(item.lat),
      }));

      sceneInts.current.addLayer(pLayer);
      /** 更新数据 */
      pLayer.setData(cityPolygonData);
      /** 更新数据后重新强制渲染更新 */
      // sceneInts.current.render();

      console.log(
        JSON.stringify(cityPolygonData, null, 2),
        '>>>>>>JSON数据 这里的数据不能作为绘制边界的数据',
      );
      console.log(pLayer, '多边形>>>>>>>>>>>todo 清除上一次操作');

      /** 清楚标记 */
      popup
        .setLnglat([+log, +lat])
        .setHTML(`<div style="font-size: 12px;color: green;">${name}</div>`);

      marker.setLnglat({ lng: +log, lat: +lat }).setPopup(popup);
      sceneInts.current.addMarker(marker);
      // sceneInts.current.addPopup(pop);
      sceneInts.current.setCenter([+log, +lat]);

      // @ts-ignore
      sceneInts.current.getMapService().map?.setCity(cityPos.name);
    }
  }, [props.cityPos]);

  // useEffect(() => {
  //   if (sceneInts.current) {
  //     if (props.zoom) {
  //       sceneInts.current.addControl(zoomControl);
  //     } else {
  //       sceneInts.current.removeControl(zoomControl);
  //     }

  //     if (props.scale) {
  //       sceneInts.current.addControl(scaleControl);
  //     } else {
  //       sceneInts.current.removeControl(scaleControl);
  //     }
  //   }
  // }, [props.zoom, props.scale]);

  // useEffect(() => {
  //   if (props.shapeType) {
  //     queryHeatData();
  //   }
  // }, [props.shapeType]);

  const heatData = useMemo(() => result || heatMapJsonData, [JSON.stringify(result)]);
  useEffect(() => {
    if (sceneInts && sceneInts.current && loaded && Array.isArray(result) && result.length > 0) {
      /** 添加热力图图层 */
      sceneInts.current?.addLayer(heatLayer);
      heatLayer.setData(heatData);

      /** 添加自定义 control */
      // fullControl.onAdd = () =>
      //   createFullElement(false, () => {
      //     message.success('点击全屏');
      //   });
      // sceneInts.current.addControl(fullControl);

      // sceneInts.current.render();
    }
  }, [sceneInts, loaded, heatData]);

  return <div id="map" />;
});

export default BasicHeatMap;
