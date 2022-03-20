import React from 'react';
import {
  NsGraph,
  MODELS,
  IconStore,
  NsGraphCmd,
  IToolbarModel,
  IModelService,
  XFlowGraphCommands,
  createToolbarConfig,
  IToolbarItemOptions,
  DisposableCollection,
  CANVAS_SCALE_TOOLBAR_CONFIG,
  // XFlowNodeCommands,
  // CANVAS_SCALE_TOOLBAR_CONFIG,
} from '@antv/xflow';
import {
  SaveOutlined,
  PlusOutlined,
  MinusOutlined,
  SettingOutlined,
  GatewayOutlined,
  OneToOneOutlined,
  CompressOutlined,
  RollbackOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from '@ant-design/icons';
import { message } from 'antd';

namespace FaultTreeToolbarConfig {
  /** 上一步 */
  IconStore.set('RollbackOutlined', RollbackOutlined);
  IconStore.set('SaveOutlined', SaveOutlined);
  /** 框选 */
  IconStore.set('GatewayOutlined', GatewayOutlined);
  /** 自动排列布局 */
  IconStore.set('SettingOutlined', SettingOutlined);

  /** 扩展按钮 */
  IconStore.set('MinusOutlined', MinusOutlined);
  IconStore.set('PlusOutlined', PlusOutlined);
  IconStore.set('OneToOneOutlined', OneToOneOutlined);
  IconStore.set('CompressOutlined', CompressOutlined);
  IconStore.set('FullscreenOutlined', FullscreenOutlined);
  IconStore.set('FullscreenExitOutlined', FullscreenExitOutlined);

  /** toolbar依赖的状态 */
  export interface IToolbarState {
    /** 是否开启多选 */
    isMultiSelctionActive: boolean;
    /** 是否可撤回 */
    undoable?: boolean;
  }

  /** 扩展配置 */
  export interface ExtraToolbarConfig {
    /** 缩小尺寸 */
    zoomFactor?: number;
    /** 是否全屏 */
    fullscreen?: boolean;
  }

  /** 获取工具栏状态 */
  export const getToolbarState = async (modelService: IModelService) => {
    const {
      isEnable: isMultiSelctionActive,
    } = await MODELS.GRAPH_ENABLE_MULTI_SELECT.useValue(modelService);

    /** @todo: 貌似是不生效 MODELS.COMMAND_UNDOABLE.getModel(modelService) */
    // const undoable = await MODELS.HISTORY_UNDOABLE.useValue(modelService);

    return {
      isMultiSelctionActive,
    } as FaultTreeToolbarConfig.IToolbarState;
  };

  /** 主工具栏配置: @todo后续添加额外操作按钮及排序order */
  export const getToolbarItems = async (
    state: FaultTreeToolbarConfig.IToolbarState
  ) => {
    const groups: IToolbarItemOptions[] = [
      {
        id: XFlowGraphCommands.GRAPH_HISTORY_UNDO.id,
        iconName: 'RollbackOutlined',
        tooltip: '上一步(Cmd+z,Ctrl+z)',
        isEnabled: state.undoable,
        onClick: async ({ commandService }) => {
          message.success(`上一步---> ${commandService.isRedoable}`);
          if (state.undoable || commandService.isUndoable) {
            commandService.undoCommand();
          }
        },
      },
      {
        id: XFlowGraphCommands.GRAPH_HISTORY_REDO.id,
        icon: <RollbackOutlined style={{ transform: 'rotateY(180deg)' }} />,
        tooltip: '下一步(Cmd+Shift+z,Ctrl+y)',
        onClick: async ({ commandService }) => {
          message.success(`下一步 ----> ${commandService.isRedoable}`);
          if (commandService.isRedoable) {
            commandService.redoCommand();
          }
        },
      },
      {
        tooltip: '框选',
        iconName: 'GatewayOutlined',
        active: state.isMultiSelctionActive,
        id: XFlowGraphCommands.GRAPH_TOGGLE_MULTI_SELECT.id,
        onClick: async ({ commandService }) => {
          commandService.executeCommand<
            NsGraphCmd.GraphToggleMultiSelect.IArgs
          >(XFlowGraphCommands.GRAPH_TOGGLE_MULTI_SELECT.id, {});
        },
      },
      {
        id: XFlowGraphCommands.SAVE_GRAPH_DATA.id,
        iconName: 'SaveOutlined',
        tooltip: '保存(Cmd+s,Ctrl+s)',
        onClick: async ({ commandService }) => {
          commandService.executeCommand<NsGraphCmd.SaveGraphData.IArgs>(
            XFlowGraphCommands.SAVE_GRAPH_DATA.id,
            {
              saveGraphDataService: (meta, graphData): any => {
                console.log(meta, graphData, '保存');
                message.success('保存');
              },
            }
          );
        },
      },
      {
        id: XFlowGraphCommands.GRAPH_LAYOUT.id,
        iconName: 'SettingOutlined',
        tooltip: '自动排列画布',
        onClick: async ({ commandService }) => {
          commandService.executeCommand<NsGraphCmd.GraphLayout.IArgs>(
            XFlowGraphCommands.GRAPH_LAYOUT.id,
            {
              customLayout: (graphData: NsGraph.IGraphData): any => {
                console.log(graphData, '@todo 自动排列布局');
                message.success('自动排列布局');
              },
            }
          );
          commandService.executeCommandPipeline([
            {
              commandId: XFlowGraphCommands.GRAPH_ZOOM.id,
              getCommandOption: async () => {
                return {
                  args: {
                    factor: 'real',
                  } as NsGraphCmd.GraphZoom.IArgs,
                };
              },
            },
            // {
            //   commandId: XFlowGraphCommands.GRAPH_RENDER.id,
            //   getCommandOption: async (ctx) => {
            //     console.log(ctx.getGraphConfig(), '>>>>>>>>>>>graphData');
            //     return { args: {} as NsGraphCmd.GraphRender.IArgs };
            //   },
            // },
          ]);
        },
      },
    ];

    /** 必须返回数组 包含 name 和 items */
    return [{ name: 'main', items: groups }];
  };
  export const getMainDependencies = async (modelService: IModelService) => {
    return [
      await MODELS.SELECTED_CELLS.getModel(modelService),
      await MODELS.COMMAND_UNDOABLE.getModel(modelService),
    ];
  };

  /** 扩展工具栏配置 */
  export const getExtraToolbarItems = ({
    zoomFactor,
    fullscreen,
  }: ExtraToolbarConfig) => {
    // const baseList = CANVAS_SCALE_TOOLBAR_CONFIG.getToolbarConfig({
    //   zoomFactor,
    // });
    const zoomItems: IToolbarItemOptions[] = [
      {
        id: CANVAS_SCALE_TOOLBAR_CONFIG.ZOOM_OUT,
        tooltip: '缩小',
        iconName: 'MinusOutlined',
        /** isEnabled @todo: 获取最小配置 */
        onClick: ({ commandService }) => {
          commandService.executeCommand<NsGraphCmd.GraphZoom.IArgs>(
            XFlowGraphCommands.GRAPH_ZOOM.id,
            {
              factor: -0.1,
              zoomOptions: CANVAS_SCALE_TOOLBAR_CONFIG.zoomOptions,
            }
          );
        },
      },
      {
        id: CANVAS_SCALE_TOOLBAR_CONFIG.ZOOM_IN,
        tooltip: '放大',
        iconName: 'PlusOutlined',
        /** isEnabled @todo */
        onClick: ({ commandService }) => {
          commandService.executeCommand<NsGraphCmd.GraphZoom.IArgs>(
            XFlowGraphCommands.GRAPH_ZOOM.id,
            {
              factor: 0.1,
              zoomOptions: CANVAS_SCALE_TOOLBAR_CONFIG.zoomOptions,
            }
          );
        },
      },
      {
        id: CANVAS_SCALE_TOOLBAR_CONFIG.SCALE_TO_ONE,
        iconName: 'OneToOneOutlined',
        tooltip: '缩放到1:1',
        isEnabled: zoomFactor !== 1,
        onClick: ({ commandService }) => {
          commandService.executeCommand<NsGraphCmd.GraphZoom.IArgs>(
            XFlowGraphCommands.GRAPH_ZOOM.id,
            {
              factor: 'real',
              zoomOptions: CANVAS_SCALE_TOOLBAR_CONFIG.zoomOptions,
            }
          );
        },
      },
      /** 暂时不用 */ {
        id: CANVAS_SCALE_TOOLBAR_CONFIG.SCALE_TO_FIT,
        tooltip: '缩放到适应屏幕',
        iconName: 'CompressOutlined',
        isVisible: true,
        onClick: ({ commandService }) => {
          commandService.executeCommand<NsGraphCmd.GraphZoom.IArgs>(
            XFlowGraphCommands.GRAPH_ZOOM.id,
            {
              factor: 'fit',
              zoomOptions: CANVAS_SCALE_TOOLBAR_CONFIG.zoomOptions,
            }
          );
        },
      },
    ];
    const fullScreenItems: IToolbarItemOptions[] = [
      {
        id: CANVAS_SCALE_TOOLBAR_CONFIG.FULLSCREEN,
        tooltip: !fullscreen ? '全屏' : '退出全屏',
        iconName: !fullscreen ? 'FullscreenOutlined' : 'FullscreenExitOutlined',
        onClick: ({ commandService }) => {
          commandService.executeCommand<NsGraphCmd.GraphFullscreen.IArgs>(
            XFlowGraphCommands.GRAPH_FULLSCREEN.id,
            {}
          );
        },
      },
    ];

    return [
      {
        name: 'zoom',
        items: zoomItems,
      },
      {
        name: 'fullScreen',
        items: fullScreenItems,
      },
    ];
  };
}

/** Export hook / please learn rxjs */
export const useToolbarConfig = createToolbarConfig((toolbarConfig) => {
  /** 生产 toolbar item */
  toolbarConfig.setToolbarModelService(
    async (
      toolbarModel: IToolbarModel,
      modelService: IModelService,
      toDispose: DisposableCollection
    ) => {
      const updateMainModel = async () => {
        const state = await FaultTreeToolbarConfig.getToolbarState(
          modelService
        );

        const mainItems = await FaultTreeToolbarConfig.getToolbarItems(state);
        toolbarModel.setValue((toolbar) => {
          toolbar.mainGroups = mainItems;
        });
      };
      const mainModels = await FaultTreeToolbarConfig.getMainDependencies(
        modelService
      );
      const subscriptions = mainModels.map((model) => {
        return model.watch(updateMainModel);
      });
      toDispose.pushAll(subscriptions);

      // extra
      const graphScale = await MODELS.GRAPH_SCALE.useValue(modelService);
      /** 设置初始值*/
      toolbarModel.setValue((m) => {
        m.extraGroups = FaultTreeToolbarConfig.getExtraToolbarItems({
          zoomFactor: graphScale.zoomFactor,
          fullscreen: false,
        });
      });

      /** 设置全屏 */
      const graphFullscreenModel = await MODELS.GRAPH_FULLSCREEN.getModel(
        modelService
      );
      graphFullscreenModel.watch((fullscreen) => {
        toolbarModel.setValue((m) => {
          m.extraGroups = FaultTreeToolbarConfig.getExtraToolbarItems({
            zoomFactor: graphScale.zoomFactor,
            fullscreen,
          });
        });
      });

      /** graphScaleModel 更新时联动 Toolbar*/
      const graphScaleModel = await MODELS.GRAPH_SCALE.getModel(modelService);
      graphScaleModel.watch(async ({ zoomFactor }) => {
        const fullscreen = await MODELS.GRAPH_FULLSCREEN.useValue(modelService);
        toolbarModel.setValue((m) => {
          m.extraGroups = FaultTreeToolbarConfig.getExtraToolbarItems({
            zoomFactor,
            fullscreen,
          });
        });
      });
    }
  );
});
