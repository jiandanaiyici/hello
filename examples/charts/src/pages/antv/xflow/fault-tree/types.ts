import type { IPosition, NsGraphCmd } from '@antv/xflow';
import type { ILayout } from '@antv/layout/es/layout/types';
import React from 'react';

export interface XFlowDemoProps {
  layoutType?: ILayout.LayoutTypes;
  graphData?: any;
  /** 是否开启小地图 */
  minimap?: boolean; // | typeof CanvasMiniMap;
  children?: any;
  graphLayout?: NsGraphCmd.GraphLayout.IArgs;
  position?: IPosition;
  className?: string;
  style?: React.CSSProperties;
}

declare const NodeActionTypes: ['add', 'add-node-edge', 'del', 'update'];
export type NodeActionType = typeof NodeActionTypes[number];
