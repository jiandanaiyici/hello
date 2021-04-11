declare const ChannelTypes: ['WEIBO', 'TIKTOK', 'BAIDU', 'TIKTOK_SEARCH'];
export type ChannelType = typeof ChannelTypes[number];

export type ChildType = 'hot' | 'normal';

export interface ChildData {
  topicName: string;
  type: ChildType;
  startDate: string;
  endDate: string;
  channel: ChannelType;
}

export interface GanttTreeData {
  name: string;
  /** 子集 */
  children: ChildData[];
  /** 热门 */
  hot: ChildData[];
}

export interface GanttTreeProps {
  dataSource?: GanttTreeData[];
  /** 开始结束时间, 如果不传 动态递归查找 */
  startDate?: string;
  endDate?: string;
  loading?: boolean;
}

