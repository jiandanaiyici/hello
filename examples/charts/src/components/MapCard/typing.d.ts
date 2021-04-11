declare type MapCardContentType = {
  config: StateType;
  setConfig: (patch: Partial<StateType> | ((prevState: StateType) => Partial<StateType>)) => void;
};

declare type StateType = {};

/** 布局类型 */
declare const JustifyTypes: ['start' | 'end' | 'center' | 'space-around' | 'space-between'];
declare type JustifyType = typeof JustifyTypes[number];

/** 布局方向 */
declare const DirectionTypes: ['row', 'row-reverse', 'column', 'column-reverse'];
declare type DirectionType = typeof DirectionTypes[number];
