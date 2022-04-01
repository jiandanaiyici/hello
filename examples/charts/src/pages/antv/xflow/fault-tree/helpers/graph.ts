import { NsGraph, XFlowGraphCommands } from '@antv/xflow';
import type {
  NsGraphCmd,
  IApplication,
  IGraphPipelineCommand,
} from '@antv/xflow';
import { DEFAULT_LAYOUT } from '../constants';

/** 查询图的节点和边的数据 */
export const initGraphCmds = async (
  app: IApplication | null,
  graphData: NsGraph.IGraphData
) => {
  if (app) {
    const graph = await app.getGraphInstance();

    await app.executeCommandPipeline([
      // /** 1. 从服务端获取数据 */
      // {
      //   commandId: XFlowGraphCommands.LOAD_DATA.id,
      //   getCommandOption: async () => {
      //     return {
      //       args: {
      //         loadDataService: MockApi.loadGraphData,
      //       },
      //     };
      //   },
      // } as IGraphPipelineCommand<NsGraphCmd.GraphLoadData.IArgs>,
      /** 2. 执行布局算法 */
      {
        commandId: XFlowGraphCommands.GRAPH_LAYOUT.id,
        getCommandOption: async () => {
          return {
            args: {
              ...DEFAULT_LAYOUT,
              graphData,
            },
          };
        },
      } as IGraphPipelineCommand<NsGraphCmd.GraphLayout.IArgs>,
      /** 3. 画布内容渲染 */
      {
        commandId: XFlowGraphCommands.GRAPH_RENDER.id,
        getCommandOption: async (ctx) => {
          const { graphData } = ctx.getResult();
          return {
            args: {
              graphData,
            },
          };
        },
      } as IGraphPipelineCommand<NsGraphCmd.GraphRender.IArgs>,
      /** 4. 缩放画布 */
      {
        commandId: XFlowGraphCommands.GRAPH_ZOOM.id,
        getCommandOption: async () => {
          return {
            args: { factor: 'fit', zoomOptions: { maxScale: 0.9 } },
          };
        },
      } as IGraphPipelineCommand<NsGraphCmd.GraphZoom.IArgs>,
    ]);

    graph.cleanHistory();
  }
};
