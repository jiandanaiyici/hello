import {
  createCtxMenuConfig,
  XFlowEdgeCommands,
  XFlowNodeCommands,
  MenuItemType,
  IconStore,
  MODELS,
  uuidv4,
  NsGraph,
} from '@antv/xflow';
import type { RxModel, NsNodeCmd, NsEdgeCmd, IMenuOptions } from '@antv/xflow';
import {
  DeleteOutlined,
  ReloadOutlined,
  PlusCircleFilled,
} from '@ant-design/icons';
import { Random } from 'mockjs';
import {
  nodeActionOptions,
  NODE_ACTION_HOTKEY,
  NODE_ACTION_ICON_MAP,
} from '../constants';

export namespace NsCustomMenuItems {
  IconStore.set(NODE_ACTION_ICON_MAP.add, PlusCircleFilled);
  IconStore.set(NODE_ACTION_ICON_MAP.del, DeleteOutlined);
  IconStore.set(NODE_ACTION_ICON_MAP.update, ReloadOutlined);

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

  export const NODE_MENUS: IMenuOptions[] = nodeActionOptions.map(
    ({ key, label }) => {
      return {
        id: key,
        label,
        type: MenuItemType.Leaf,
        hotkey: NODE_ACTION_HOTKEY[key],
        iconName: NODE_ACTION_ICON_MAP[key],
        onClick: async ({ target, menuItem, commandService }) => {
          switch (menuItem.id) {
            case 'add':

            case 'add-node-edge':
              const afterNode = (
                await commandService.executeCommand<
                  NsNodeCmd.AddNode.IArgs,
                  NsNodeCmd.AddNode.IResult
                >(XFlowNodeCommands.ADD_NODE.id, {
                  nodeConfig: {
                    label,
                    id: uuidv4(),
                    width: 100,
                    height: 30,
                  },
                })
              )
                ?.contextProvider()
                .getResult();
              if (
                menuItem.id === 'add-node-edge' &&
                !afterNode?.err &&
                afterNode?.nodeConfig
              ) {
                commandService.executeCommand<
                  NsEdgeCmd.AddEdge.IArgs,
                  NsEdgeCmd.AddEdge.IResult
                >(XFlowEdgeCommands.ADD_EDGE.id, {
                  edgeConfig: {
                    id: uuidv4(),
                    target: afterNode?.nodeConfig.id,
                    source: target.data?.id as string,
                  },
                });
              }
              break;
            case 'del':
              commandService.executeCommand<
                NsNodeCmd.DelNode.IArgs,
                NsNodeCmd.DelNode.IResult
              >(XFlowNodeCommands.DEL_NODE.id, {
                nodeConfig: target.data as NsGraph.INodeConfig,
                options: {
                  /** 是否删除链接线 */
                  // disconnectEdges: true,
                  /** 是否触发删除事件 */
                  // silent: true,
                },
              });
              break;
            case 'update':
              commandService.executeCommand<
                NsNodeCmd.UpdateNode.IArgs,
                NsNodeCmd.UpdateNode.IResult
              >(XFlowNodeCommands.UPDATE_NODE.id, {
                nodeConfig: {
                  ...target.data,
                  label: Random.city(),
                } as NsGraph.INodeConfig,
              });
              break;

            default:
              break;
          }
        },
      };
    }
  );

  // export const NODE_LIKE: IMenuOptions = {
  //   id: 'NODE_LINK',
  //   label: 'NODE_LINK',
  //   render: ({ target }) => {
  //     return (
  //       <Tooltip title="自定义渲染">
  //         <Button size="small" block type="link">
  //           {target.data?.label}
  //         </Button>
  //       </Tooltip>
  //     );
  //   },
  // };
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
            label: '节点操作',
            hotkey: 'node',
            type: MenuItemType.Root,
            submenu: NsCustomMenuItems.NODE_MENUS,
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
