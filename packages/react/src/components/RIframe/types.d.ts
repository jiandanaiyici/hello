import { ReactNode } from 'react';
declare type DisplayType = 'block' | 'inline' | 'none';
declare const PositionTypes: [
  'relative',
  'absolute',
  'fixed',
  'sticky',
  'static',
  'inherit',
  'initial',
  'unset',
];

declare type PosType = typeof PositionTypes[number];
declare type NthCbk = () => void;
declare interface Actions {
  /** 全屏 */
  onFull?: NthCbk;
  /** 退出全屏 */
  onExitFull: NthCbk;
}

export interface IProps extends Omit<React.IframeHTMLAttributes<Element>, 'title'> {
  /** 对 加载页面简单的描述, 可以理解为 alt 的功能 */
  title?: ReactNode;
  extra?: ReactNode;
  showToolbar?: boolean;
  display?: DisplayType;
  position?: PosType;
  actions?: Actions;
  /** 加载之前 */
  onBeforeLoaded?: NthCbk;
  /** iframe 加载成功 */
  onLoaded?: NthCbk;
  /** iframe 加载失败 */
  onError?: NthCbk;
}

export interface ToolbarProps {
  isFullscreen?: boolean;
  onFull: NthCbk;
  onExit: NthCbk;
  className?: string;
}
