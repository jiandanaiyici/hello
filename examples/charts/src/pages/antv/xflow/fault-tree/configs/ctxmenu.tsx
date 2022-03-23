import React from 'react';
import {
  createCtxMenuConfig,
  XFlowEdgeCommands,
  XFlowNodeCommands,
  MenuItemType,
  NsEdgeCmd,
  NsNodeCmd,
  MODELS,
  uuidv4,
} from '@antv/xflow';
import type { RxModel, IMenuOptions } from '@antv/xflow';
import { Button, Tooltip } from 'antd';
import { Random } from 'mockjs';

export namespace NsCustomMenuItems {
  export const EMPTY_MENU: IMenuOptions = {
    id: 'EMPTY_MENU_ITEM',
    label: '暂无可用',
    isEnabled: false,
    iconName: 'DeleteOutlined',
    onClick: async () => {},
  };
  export const SEPARATOR: IMenuOptions = {
    id: MenuItemType.Separator,
    type: MenuItemType.Separator,
  };

  export const EDGE_MENU: IMenuOptions = {
    id: 'EDGE_MENU',
    label: '设置边高亮',
    isEnabled: true,
    onClick: async ({ target, commandService }) => {
      commandService.executeCommand<
        NsEdgeCmd.HighlightEdge.IArgs,
        NsEdgeCmd.HighlightEdge.IResult
      >(XFlowEdgeCommands.HIGHLIGHT_EDGE.id, {
        // @ts-ignore
        edgeId: target?.data.id,
        strokeColor: '#ff9068',
        strokeWidth: 2,
      });
    },
  };

  export const RANDOM_NODE_NAME: IMenuOptions = {
    id: 'RANDOM_NODE_NAME',
    label: '随机设置名称',
    hotkey: 'update',
    // type: MenuItemType.Root,
    iconName: 'DeleteOutlined',
    onClick: async ({ target, commandService }) => {
      commandService.executeCommand<
        NsNodeCmd.UpdateNode.IArgs,
        NsEdgeCmd.UpdateEdge.IResult
      >(XFlowNodeCommands.UPDATE_NODE.id, {
        nodeConfig: {
          ...target.data,
          id: target?.data?.id,
          label: Random.city(),
        },
        updateNodeService: async () => {
          console.log('>>>>>>>>>>>>>>>>>>>');
        },
      });
    },
  };

  export const NODE_LIKE: IMenuOptions = {
    id: 'NODE_LINK',
    label: 'NODE_LINK',
    render: ({ target }) => {
      return (
        <Tooltip title="自定义渲染">
          <Button size="small" block type="link">
            {target.data?.label}
          </Button>
        </Tooltip>
      );
    },
  };
}

export const useCtxMenuConfig = createCtxMenuConfig((config, proxy) => {
  config.setMenuModelService(
    async (
      data: MODELS.CONTEXTMENU_TARGET.IState,
      model: RxModel<IMenuOptions>
    ) => {
      switch (data?.type) {
        case 'node':
          model.setValue({
            id: XFlowEdgeCommands.DEL_EDGE.id,
            label: '删除边',
            hotkey: 'Delete',
            type: MenuItemType.Root,
            submenu: [
              NsCustomMenuItems.RANDOM_NODE_NAME,
              NsCustomMenuItems.SEPARATOR,
              NsCustomMenuItems.NODE_LIKE,
            ],
            onClick: async () => {},
          });
          break;

        case 'edge':
          model.setValue({
            id: 'EDGE',
            label: '玩呢',
            type: MenuItemType.Root,
            submenu: [NsCustomMenuItems.EDGE_MENU],
          });
        default:
          model.setValue({
            id: uuidv4(),
            label: '',
            type: MenuItemType.Root,
            submenu: [NsCustomMenuItems.EMPTY_MENU],
          });
          break;
      }
    }
  );
});
