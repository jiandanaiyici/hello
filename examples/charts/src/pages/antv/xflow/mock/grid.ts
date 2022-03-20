export type LayoutTypes =
  | 'grid'
  | 'random'
  | 'force'
  | 'circular'
  | 'dagre'
  | 'radial'
  | 'concentric'
  | 'mds'
  | 'fruchterman'
  // | 'fruchterman-gpu'
  | 'gForce'
  // | 'gForce-gpu'
  | 'comboForce'
  | 'forceAtlas2'
// | 'er';

const GRIDS: Record<LayoutTypes, string> = {
  grid: '格子布局',
  gForce: '经典力导向布局',
  circular: '环形布局',
  forceAtlas2: 'FA2 力导向布局',
  random: '随机布局',
  fruchterman: 'Fruchterman 布局',
  mds: '高维数据降维',
  dagre: '层次布局',
  force: '引用 d3 的经典力导向布局',
  radial: '辐射状布局',
  comboForce: 'combo 图的力导向布局',
  concentric: '同心圆布局'
}

export const BASE_LINK = 'https://g6.antv.vision/zh/docs/api/graphLayout';

export const GRID_OPTIONS = Object.keys(GRIDS).map(key => ({
  key,
  value: key,
  label: GRIDS[key],
  // zhLink: `${BASE_LINK}/${key}`
}))