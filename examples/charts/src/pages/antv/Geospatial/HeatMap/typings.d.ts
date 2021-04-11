/// <reference path = "@/components/CityCascader" />
/// <reference path = "@antv/l7-maps/typings" />
/// <reference path = "amap-js-api/map" />

declare namespace HeatMapInt {
  /** 图表类型: 网格图 | 热力图 | 行政图 */
  const ShapeTypes: ['heat', 'grid', 'administration'];
  type ShapeType = typeof ShapeTypes[number];

  type ExportImageType = 'jpg' | 'png';

  type ControlState = {
    zoom: boolean;
    scale: boolean;
    city: string[];
    cityPos: CityItemData[];
    shapeType?: ShapeType;
    mapStyle: MapStyle;
    exportType?: ExportImageType;
  };

  type MapTarget = AMap.Map & IAMapInstance;
  type ClickInfo = {
    target: MapTarget;
    visible: boolean;
  };

  type DetailInfo = {
    /** 中心点所在区域 */
    city: CityDataInfo;
    /** 缩放等级 */
    zoom: number;
    /** 地图比例尺 */
    scale: number;
    /** 中心点 */
    center: any;
    /** 获取俯仰角 */
    pitch: number;
    /** 地图标注的显示顺序 */
    labelIndex: number;
    /** 当前可视区域 */
    bounds: any;
    /** 地图样式 */
    style: any;
  };

  type CityDataInfo = {
    /**
     * 市名称
     */
    city: string;
    /**
     * 市代码
     */
    citycode: string;
    /**
     * 区名称
     */
    district: string;
    /**
     * 省
     */
    province: string;
  };

  /** 标准 | 幻影黑 | 月光银 | 远山黛 | 草色青 | 雅士灰 | 涂鸦 | 马卡龙 | 靛青蓝 | 极夜蓝 | 酱籽 */
  const MapStyles: [
    'normal',
    'dark',
    'light',
    'whitesmoke',
    'fresh',
    'grey',
    'graffiti',
    'macaron',
    'blue',
    'darkblue',
    'wine',
  ];
  type MapStyle = typeof MapStyles[number];
}
