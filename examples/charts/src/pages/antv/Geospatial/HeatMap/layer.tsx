import { PolygonLayer, HeatmapLayer } from '@antv/l7';

/** 绘制多边形 */
export const pLayer = new PolygonLayer({
  zIndex: 10000,
  // autoFit: true,
})
  .source([], {
    parser: {
      type: 'json',
      x: 'lng',
      y: 'lat',
    },
  })
  .shape('polygon')
  .size('count', [0, 1.0]) // weight映射通道
  .color('red')
  .fitBounds()
  .active(true);

/** 热力图 */
export const heatLayer = new HeatmapLayer({
  /** 设置图层自动适配时, 设置的 center 将会失效 */
  // autoFit: false,
  // // shape: props.shapeType,
  // enableHighlight: true,
  // /** 设置透明度 */
  // opacity: 0.8,
  // /** 多个图层时设置层级关系 */
  // zIndex: 1000,
  // // /** 高亮颜色 */
  // highlightColor: 'red',
  // activeColor: 'green',
})
  // 可以通过 json 形式转换
  .source([], {
    parser: {
      type: 'json',
      x: 'lng',
      y: 'lat',
    },
  })
  .active(true)
  .size('count', [0, 1.0]) // weight映射通道 可以设置回调函数
  .style({
    intensity: 2,
    radius: 20,
    opacity: 1.0,
    rampColors: {
      colors: ['#FF4818', '#F7B74A', '#FFF598', '#91EABC', '#2EA9A1', '#206C7C'].reverse(),
      positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
    },
  });
