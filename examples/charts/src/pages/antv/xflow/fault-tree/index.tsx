import React, { useRef } from 'react';
import {
  XFlow,
  IAppLoad,
  NsGraphCmd,
  XFlowCanvas,
  KeyBindings,
  IApplication,
  CanvasMiniMap,
  XFlowGraphCommands,
  CanvasContextMenu,
} from '@antv/xflow';
import { Graph } from '@antv/x6';

import { FaultTreeToolbar } from './toolbar';
import type { XFlowDemoProps } from './types';
import {
  useGraphConfig,
  useCtxMenuConfig,
  useKeybindingConfig,
  useCmdConfig,
} from './configs';

import './index.less';

const FaultTree: React.FC<XFlowDemoProps> = React.memo<XFlowDemoProps>(
  (props) => {
    const appInstanceRef = useRef<Graph>();
    const graphRef = useRef<IApplication>();
    const { minimap, graphData, layoutType } = props;
    const graphConfig = useGraphConfig();
    const keybindingConfig = useKeybindingConfig(props);
    const ctxMenuConfig = useCtxMenuConfig(props);
    const cmdConfig = useCmdConfig(props);

    const onLoad: IAppLoad = async (app: IApplication) => {
      appInstanceRef.current = await app.getGraphInstance();
      graphRef.current = app;
    };

    /** @todo: 是否可以根据 createModelSericeConfig 通过 watch 方式更新 ? */
    React.useEffect(() => {
      const updateGrid = async () => {
        if (graphRef.current) {
          await graphRef.current.executeCommandPipeline([
            {
              commandId: XFlowGraphCommands.GRAPH_LAYOUT.id,
              getCommandOption: async () => {
                // const { graphData: data } = ctx?.getResult();
                return {
                  args: {
                    graphData,
                    layoutType,
                    layoutOptions: {
                      type: 'dagre',
                      rankdir: 'LR',
                      nodesep: 10,
                      ranksep: 80,
                    },
                  } as NsGraphCmd.GraphLayout.IArgs,
                };
              },
            },
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
            {
              commandId: XFlowGraphCommands.GRAPH_RENDER.id,
              getCommandOption: async () => {
                return {
                  args: {
                    graphData,
                  },
                };
              },
            },
          ]);
        }
      };
      updateGrid();
    }, [layoutType, graphData]);

    return (
      // <div className={basePrefix}>
      <XFlow
        graphData={graphData}
        commandConfig={cmdConfig}
        onLoad={onLoad}
        graphLayout={{
          layoutType,
          layoutOptions: {
            type: layoutType,
            rankdir: 'TB',
            nodesep: 60,
            ranksep: 40,
          },
        }}
      >
        {/* {props.children} */}
        <FaultTreeToolbar />
        <KeyBindings config={keybindingConfig} />
        {minimap && <CanvasMiniMap />}
        <XFlowCanvas config={graphConfig}>
          <CanvasContextMenu config={ctxMenuConfig} />
        </XFlowCanvas>
      </XFlow>
      // </div>
    );
  }
);

FaultTree.defaultProps = {
  minimap: false,
};

export { FaultTreeEditPanel } from './edit-panel';
export { FaultTree };
