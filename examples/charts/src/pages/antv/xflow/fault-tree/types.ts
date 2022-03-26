import type { IPosition, NsGraphCmd } from '@antv/xflow';
import type { ILayout } from '@antv/layout/es/layout/types';

export interface XFlowDemoProps {
  layoutType?: ILayout.LayoutTypes;
  graphData?: any;
  /** 是否开启小地图 */
  minimap?: boolean; // | typeof CanvasMiniMap;
  children?: any;
  graphLayout?: NsGraphCmd.GraphLayout.IArgs;
  position?: IPosition;
}
