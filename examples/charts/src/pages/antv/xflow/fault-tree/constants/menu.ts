import { objToLabelValue } from '@/utils';
import { NodeActionType } from '../types';

export enum NODE_ACTIONS {
  add = 'ADD_NODE',
  del = 'DEL_NODE',
  update = 'UPDATE_NODE',
}

export enum NODE_ACTION_HOTKEY {
  add = 'cmd+alt+n',
  del = 'delete',
}

export enum NODE_ACTION_ICON_MAP {
  add = 'PlusCircleOutlined',
  del = 'DeleteOutlined',
  update = 'ReloadOutlined',
}

export enum NODE_ACTION_TEXTS {
  add = '新增节点',
  'add-node-edge' = '新增节点 & 边',
  del = '删除节点',
  update = '更新节点',
}
export const nodeActionOptions = objToLabelValue<NodeActionType>(
  NODE_ACTION_TEXTS
);
