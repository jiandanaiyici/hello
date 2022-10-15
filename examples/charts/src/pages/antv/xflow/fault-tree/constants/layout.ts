import type { NsGraphCmd } from '@antv/xflow';

export const DEFAULT_LAYOUT: NsGraphCmd.GraphLayout.IArgs = {
  layoutType: 'dagre',
  layoutOptions: {
    type: 'dagre',
    /** 布局方向 */
    rankdir: 'TB',
    /** 节点间距 */
    nodesep: 60,
    /** 层间距 */
    ranksep: 30,
  },
};
