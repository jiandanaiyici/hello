import { objToLabelValue } from '@/utils/data';

/** 图层类型 */
const LAYER_TYPE: Record<HeatMapInt.ShapeType, string> = {
  heat: '热力图',
  grid: '网格图',
  administration: '行政图',
};
export const layerTypeList = objToLabelValue<HeatMapInt.ShapeType>(LAYER_TYPE);

const EXPORT_IMAGE_TYPE: Record<HeatMapInt.ExportImageType, string> = {
  jpg: 'JPG',
  png: 'PNG',
};
export const exportImageList = objToLabelValue<HeatMapInt.ExportImageType>(EXPORT_IMAGE_TYPE);

const MAP_STYLES: Record<HeatMapInt.MapStyle, string> = {
  normal: '标准',
  light: '月光银',
  dark: '幻影黑',
  whitesmoke: '远山黛',
  fresh: '草色青',
  grey: '雅士灰',
  graffiti: '涂鸦',
  macaron: '马卡龙',
  blue: '靛青蓝',
  darkblue: '极夜蓝',
  wine: '酱籽',
};
export const mapStyleList = objToLabelValue<HeatMapInt.MapStyle>(MAP_STYLES);

export const fullOpenHtml = `<svg viewBox="64 64 896 896" focusable="false" class="" data-icon="fullscreen" width="1em" height="1em" fill="currentColor" aria-hidden="true">
<path d="M290 236.4l43.9-43.9a8.01 8.01 0 00-4.7-13.6L169 160c-5.1-.6-9.5 3.7-8.9 8.9L179 329.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zm352.7 187.3c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6 43.7 43.7a8.01 8.01 0 0013.6-4.7L863.9 169c.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370a8.03 8.03 0 000 11.3l42.4 42.4zM845 694.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3a8.03 8.03 0 00-11.3 0l-42.4 42.3a8.03 8.03 0 000 11.3L734 787.6l-43.9 43.9a8.01 8.01 0 004.7 13.6L855 864c5.1.6 9.5-3.7 8.9-8.9L845 694.9zm-463.7-94.6a8.03 8.03 0 00-11.3 0L236.3 733.9l-43.7-43.7a8.01 8.01 0 00-13.6 4.7L160.1 855c-.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-.8 9.4-8.9 4.7-13.6L290 787.6 423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z"></path>
</svg>`;

export const fullCloseHtml = `<svg viewBox="64 64 896 896" focusable="false" class="" data-icon="fullscreen-exit" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 00-11.3 0l-42.4 42.3a8.03 8.03 0 000 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 004.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 000 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 00391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6 877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 00-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 00-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 00-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z"></path></svg>`;

const DIRS: Record<DirectionType, string> = {
  row: '横向',
  'row-reverse': '横向逆向',
  column: '竖向',
  'column-reverse': '竖向逆向',
};
export const directionList = objToLabelValue<DirectionType>(DIRS);

const JUSTIFY_OBJ: Record<JustifyType, string> = {
  end: 'end',
  start: 'start',
  center: 'center',
  'space-around': 'space-around',
  'space-between': 'space-between',
};
export const justifyList = objToLabelValue<JustifyType>(JUSTIFY_OBJ);
