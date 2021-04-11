import { Zoom, Scale, Marker, Popup, Control } from '@antv/l7';
import { fullOpenHtml, fullCloseHtml } from './contants';

/** 缩放控制 */
export const zoomControl = new Zoom({
  position: 'topleft',
});

/** 比例尺 */
export const scaleControl = new Scale({
  position: 'topright',
});

/** 信息弹框 */
export const popup = new Popup({
  offsets: [0, 30],
  closeButton: false,
  closeOnClick: false,
});

/** Marker 标注 */
export const marker = new Marker({
  /** 标注颜色 */
  color: 'red',
  /** 自定义节点 */
  // element: '',
  /** 锚点位置: anchorType(center, top, top-left, top-right, bottom, bottom-left, left, right) */
  // anchor: 'top',
});

export const fullControl = new Control({
  name: 'fullScreen',
  position: 'bottomleft',
});

export const getFullControl = (isFull: boolean) => (isFull ? fullCloseHtml : fullOpenHtml);
export const createFullElement = (
  isFull: boolean,
  onClick: (this: GlobalEventHandlers, ev: MouseEvent) => any,
) => {
  const div = document.createElement('div');
  div.innerHTML = `${getFullControl(isFull)} 全屏`;
  div.onclick = onClick;
  div.setAttribute(
    'style',
    'height: 100px; width: 100px; background: red;font-size: 24px; color: #fff; cursor: pointer;',
  );
  div.id = 'fullScreen';
  return div;
};
