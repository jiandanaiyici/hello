import { ReactNode } from 'react';
import { IMapConfig, ISceneConfig, Scene } from '@antv/l7';

export interface BasicInt {
  className?: string;
  style?: React.CSSProperties;
  map: Partial<IMapConfig>;
  option?: Partial<ISceneConfig>;
  children?: ReactNode;
  onSceneLoaded?: (scene: Scene) => void;
}
