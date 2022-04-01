/** 注册全局键盘事件 */
import {
  MODELS,
  NsNodeCmd,
  NsEdgeCmd,
  NsGraphCmd,
  XFlowEdgeCommands,
  XFlowNodeCommands,
  XFlowGraphCommands,
  createKeybindingConfig,
} from '@antv/xflow';
import { Platform } from '@antv/x6';
import type { Node as X6Node, Edge as X6Edge } from '@antv/x6';
import type {
  IModelService,
  KeybindingConfig,
  IGraphCommandService,
} from '@antv/xflow';
import { IKeyBinding } from '@antv/xflow-core/es/keybinding/interface';

const BASE_KEY_PRIFIX = 'FAULT_TREE';

/** 删除快捷键 */
enum DelShortCut {
  /** 单个删除 */
  DELETE = 'Backspace',
  /** Mac按住Command多选删除 */
  CmdDelete = 'Cmd+Delete',
  /** Windows按住Ctrl多选删除 */
  CtrlDelete = 'Ctrl+Delete',
}

/** 添加节点 */
enum AddNodeShortCut {
  CmdAdd = 'Cmd+Alt+N',
  CtrlAdd = 'Ctrl+Alt+N',
  CmdAddEdgeNode = 'Cmd+Alt+N+E',
}

/** 保存快捷键 */
enum SaveShortCut {
  CmdSave = 'Cmd+Shift+S',
  CtrlSave = 'Ctrl+S',
}

/** 历史记录 */
enum HistoryShortCut {
  /** 撤销 */
  CmdUndo = 'Cmd+Z',
  CtrlUndo = 'Ctrl+Z',
  /** 重做 */
  CmdRedo = 'Cmd+Shift+Z',
  CtrlRedo = 'Ctrl+Y',
}

/** 复制 / 粘贴 */
enum CopyPasteShortCut {
  /** 复制 */
  CmdCopy = 'Cmd+C',
  CtrlCopy = 'Ctrl+C',
  /** 粘贴 */
  CmdPaste = 'Cmd+V',
  CtrlPaste = 'Ctrl+V',
}

/** 删除节点 */
export const delNodes = async (cmd: IGraphCommandService, nodes: X6Node[]) => {
  const promiseList = nodes.map((node) => {
    return cmd.executeCommand<
      NsNodeCmd.DelNode.IArgs,
      NsNodeCmd.DelNode.IResult
    >(XFlowNodeCommands.DEL_NODE.id, {
      nodeConfig: {
        ...node.getData(),
        id: node.id,
      },
    });
  });

  const res = await Promise.all(promiseList);
  if (res.length) {
    console.log('删除成功!');
  }
};

/** 删除边 */
export const delEdges = async (cmd: IGraphCommandService, edges: X6Edge[]) => {
  const promiseList = edges.map((edge) => {
    return cmd.executeCommand<
      NsEdgeCmd.DelEdge.IArgs,
      NsEdgeCmd.DelEdge.IResult
    >(XFlowEdgeCommands.DEL_EDGE.id, {
      edgeConfig: {
        ...edge.getData(),
        id: edge.id,
      },
    } as NsEdgeCmd.DelEdge.IArgs);
  });

  const res = await Promise.all(promiseList);
  if (res.length) {
    console.log('删除成功!');
  }
};

/** 拆分节点 & 边 */
export const splitNodeAndEdge = async (modelService: IModelService) => {
  const cells = await MODELS.SELECTED_CELLS.useValue(modelService);
  const nodes = cells.filter((cell) => cell.isNode()) as X6Node[];
  const edges = cells.filter((cell) => cell.isEdge()) as X6Edge[];
  return { nodes, edges };
};

export const delCellFn = async (
  _item: IKeyBinding,
  modelService: IModelService,
  cmd: IGraphCommandService
) => {
  const { nodes, edges } = await splitNodeAndEdge(modelService);
  if (nodes.length) {
    delNodes(cmd, nodes);
  }
  if (edges.length) {
    delEdges(cmd, edges);
  }
};

/**@todo 同 Toolbar 重复,可考虑是否复用 */
export const useKeybindingConfig = createKeybindingConfig(
  (config: KeybindingConfig, props) => {
    config.setKeybindingFunc((reg) => {
      /** 放大 | 缩小 */
      const zooms: IKeyBinding[] = [
        {
          id: `${BASE_KEY_PRIFIX}_ZOOMOUT`, // _${XFlowGraphCommands.GRAPH_ZOOM.id}
          keybinding: ['alt+]'],
          callback: async (
            item: IKeyBinding,
            service: IModelService,
            cmd: IGraphCommandService
          ) => {
            console.log(item, service, cmd);
            const factor = await MODELS.GRAPH_SCALE.useValue(service);
            console.log(factor, '通过判断如果 max 直接返回');
            cmd.executeCommand<
              NsGraphCmd.GraphZoom.IArgs,
              NsGraphCmd.GraphZoom.IResult
            >(XFlowGraphCommands.GRAPH_ZOOM.id, {
              factor: 0.1,
            });
          },
        },
        {
          id: `${BASE_KEY_PRIFIX}_ZOOMIN`,
          keybinding: ['alt+['],
          callback: async (
            item: IKeyBinding,
            service: IModelService,
            cmd: IGraphCommandService
          ) => {
            console.log(item, service, cmd);
            cmd.executeCommand<
              NsGraphCmd.GraphZoom.IArgs,
              NsGraphCmd.GraphZoom.IResult
            >(XFlowGraphCommands.GRAPH_ZOOM.id, {
              factor: -0.1,
            });
          },
        },
        {
          id: `${BASE_KEY_PRIFIX}_ZOOMFIT`,
          keybinding: ['alt+m'],
          callback: async (
            item: IKeyBinding,
            service: IModelService,
            cmd: IGraphCommandService
          ) => {
            console.log(item, service, cmd);
            cmd.executeCommand<
              NsGraphCmd.GraphZoom.IArgs,
              NsGraphCmd.GraphZoom.IResult
            >(XFlowGraphCommands.GRAPH_ZOOM.id, {
              factor: 'fit',
            });
          },
        },
        {
          id: `${BASE_KEY_PRIFIX}_ZOOMREAL`,
          keybinding: ['alt+n'],
          callback: async (
            item: IKeyBinding,
            service: IModelService,
            cmd: IGraphCommandService
          ) => {
            console.log(item, service, cmd);
            cmd.executeCommand<
              NsGraphCmd.GraphZoom.IArgs,
              NsGraphCmd.GraphZoom.IResult
            >(XFlowGraphCommands.GRAPH_ZOOM.id, {
              factor: 'real',
            });
          },
        },
      ];

      /** 历史记录 */
      const hisotryKeys: IKeyBinding[] = [
        {
          id: `${BASE_KEY_PRIFIX}_UNDO`,
          keybinding: Platform.IS_MAC
            ? HistoryShortCut.CmdUndo
            : HistoryShortCut.CtrlUndo,
          callback: async (
            _item: IKeyBinding,
            _modelService: IModelService,
            cmd: IGraphCommandService
          ) => {
            cmd.executeCommand<
              NsGraphCmd.GraphHistoryUndo.IArgs,
              NsGraphCmd.GraphHistoryUndo.IResult
            >(XFlowGraphCommands.GRAPH_HISTORY_UNDO.id, {
              enabled: true,
            });
          },
        },
        {
          id: `${BASE_KEY_PRIFIX}_REDO`,
          keybinding: Platform.IS_MAC
            ? HistoryShortCut.CmdRedo
            : HistoryShortCut.CtrlRedo,
          callback: async (
            _item: IKeyBinding,
            _modelService: IModelService,
            cmd: IGraphCommandService
          ) => {
            cmd.executeCommand<
              NsGraphCmd.GraphHistoryRedo.IArgs,
              NsGraphCmd.GraphHistoryRedo.IResult
            >(XFlowGraphCommands.GRAPH_HISTORY_REDO.id, {});
          },
        },
      ];

      /** 保存 */
      const saveKey: IKeyBinding = {
        id: `${BASE_KEY_PRIFIX}_SAVE`,
        // 冲突 command+shift+s
        keybinding: Platform.IS_MAC
          ? SaveShortCut.CmdSave
          : SaveShortCut.CtrlSave,
        callback: async (
          _item: IKeyBinding,
          _service: IModelService,
          cmd: IGraphCommandService
        ) => {
          cmd.executeCommand<NsGraphCmd.SaveGraphData.IArgs>(
            XFlowGraphCommands.SAVE_GRAPH_DATA.id,
            {
              saveGraphDataService: (meta, graphData): any => {
                console.log(
                  meta,
                  graphData,
                  '是否保存当前布局',
                  props.getValue()
                );
              },
            }
          );
        },
      };

      /** 删除 */
      const delKeys: IKeyBinding[] = [
        {
          id: `${BASE_KEY_PRIFIX}_DELETE`,
          keybinding: DelShortCut.DELETE,
          callback: delCellFn,
        },
        {
          id: `${BASE_KEY_PRIFIX}_DELTE_ALL`,
          keybinding: Platform.IS_MAC
            ? DelShortCut.CmdDelete
            : DelShortCut.CtrlDelete,
          /** @TODO 不生效... */
          callback: delCellFn,
        },
      ];

      /** 复制粘贴 */
      const copyPasteKeys: IKeyBinding[] = [
        {
          id: `${BASE_KEY_PRIFIX}_COPY`,
          keybinding: Platform.IS_MAC
            ? CopyPasteShortCut.CmdCopy
            : CopyPasteShortCut.CtrlCopy,
          callback: async (
            _item: IKeyBinding,
            _modelService: IModelService,
            cmd: IGraphCommandService
          ) => {
            cmd.executeCommand<
              NsGraphCmd.GraphCopySelection.IArgs,
              NsGraphCmd.GraphCopySelection.IResult
            >(XFlowGraphCommands.GRAPH_COPY.id, {});
          },
        },
        {
          id: `${BASE_KEY_PRIFIX}_PASTE`,
          keybinding: Platform.IS_MAC
            ? CopyPasteShortCut.CmdPaste
            : CopyPasteShortCut.CtrlPaste,
          callback: async (
            _item: IKeyBinding,
            _modelService: IModelService,
            cmd: IGraphCommandService
          ) => {
            cmd.executeCommand<
              NsGraphCmd.GraphPasteSelection.IArgs,
              NsGraphCmd.GraphPasteSelection.IResult
            >(XFlowGraphCommands.GRAPH_PASTE.id, {});
          },
        },
      ];

      const nodeKeys: IKeyBinding[] = [
        {
          id: `${BASE_KEY_PRIFIX}_ADD_NODE`,
          keybinding: Platform.IS_MAC
            ? AddNodeShortCut.CmdAdd
            : AddNodeShortCut.CtrlAdd,
          callback: async () => {
            console.log('123');
          },
        },
      ];

      const allKeys = [
        ...zooms,
        ...hisotryKeys,
        saveKey,
        ...delKeys,
        ...nodeKeys,
        ...copyPasteKeys,
      ];

      return reg.registerKeybinding(allKeys);
    });
  }
);
