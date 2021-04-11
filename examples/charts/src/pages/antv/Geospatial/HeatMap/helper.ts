import { CityItemData } from '@/components/CityCascader';

/** 最外层所有经纬度 */
export const getAllWrapperBounds = (cityPos?: CityItemData) => {
  if (!cityPos) return [];
  const { children } = cityPos;
  if (!children || (Array.isArray(children) && children.length === 0)) return [];
  return children;
};

/** 绘制区域 */
export const getPolygonData = (data: CityItemData[]) => {
  const coordinates = data.map((item) => [item.log, item.lat]);
  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates,
        },
      },
    ],
  };
};
