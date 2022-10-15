import { IPosition } from "@antv/xflow";
import React from "react";

export interface IFaultTreePanelProps {
  style?: React.CSSProperties;
  classname?: string;
  /** 配置位置信息 */
  position?: IPosition;
  /** 前缀 classname */
  prefixClz?: string;
  /** 是否收起配置面板: 默认 true */
  defaultCollpased?: boolean;
  /** 方向: 右侧 | 左侧 */
  placement?: 'right' | 'left';
  // 暂定
  children?: React.ReactNode;
  footer?: React.ReactNode;
  header?: React.ReactNode;
}