import React, { useRef } from 'react';
import {
  XFlow,
  XFlowCanvas,
  KeyBindings,
  CanvasToolbar,
  CanvasMiniMap,
  CanvasContextMenu,
  // createComponentModel,
} from '@antv/xflow';
import type { IAppLoad, IApplication } from '@antv/xflow';
import { Graph } from '@antv/x6';

import type { XFlowDemoProps } from './types';
import {
  useCmdConfig,
  useGraphConfig,
  useCtxMenuConfig,
  useToolbarConfig,
  useKeybindingConfig,
  useModelServiceConfig,
} from './configs';
import { initGraphCmds } from './helpers';
import { DEFAULT_LAYOUT } from './constants';

import './index.less';

const FaultTree: React.FC<XFlowDemoProps> = React.memo<XFlowDemoProps>(
  (props) => {
    const appInstanceRef = useRef<Graph>();
    const graphRef = useRef<IApplication | null>(null);
    const { minimap, className, style, graphData, layoutType } = props;
    /** 配置画布信息 */
    const graphConfig = useGraphConfig(props);
    /** 配置键盘绑定 */
    const keybindingConfig = useKeybindingConfig(props);
    /** 右键菜单配置 */
    const ctxMenuConfig = useCtxMenuConfig(props);
    /** 配置命令 */
    const cmdConfig = useCmdConfig(props);
    /** 配置工具栏 */
    const toolbarConfig = useToolbarConfig(props);

    /** 配置全局注册 model */
    const modelServiceConfig = useModelServiceConfig(props);

    // const a = useLoadingState(graphRef.current?.modelService);
    // const [state, setState] = createComponentModel<NsLoadingModel.IState>({
    //   loading: false,
    // });
    // console.log(a, '>>>>>>>>>>>>>>state');

    const onLoad: IAppLoad = async (app: IApplication) => {
      const graph = await app.getGraphInstance();
      appInstanceRef.current = graph;
      graphRef.current = app;
      initGraphCmds(graphRef.current, graphData);
      // setState({ loading: true });
    };

    /** @todo: 是否可以根据 createModelSericeConfig 通过 watch 方式更新 ? */
    React.useEffect(() => {
      initGraphCmds(graphRef.current, graphData);
    }, [layoutType, graphData]);

    return (
      <XFlow
        style={style}
        onLoad={onLoad}
        className={className}
        graphData={graphData}
        commandConfig={cmdConfig}
        graphLayout={DEFAULT_LAYOUT}
        modelServiceConfig={modelServiceConfig}
      >
        {/* {props.children} */}
        <CanvasToolbar
          layout="horizontal"
          config={toolbarConfig}
          position={{ top: 0, left: 0 }}
        />
        <KeyBindings config={keybindingConfig} />
        {minimap && <CanvasMiniMap />}
        <XFlowCanvas config={graphConfig}>
          <CanvasContextMenu config={ctxMenuConfig} />
        </XFlowCanvas>
      </XFlow>
    );
  }
);

FaultTree.defaultProps = {
  minimap: false,
};

export { FaultTreeEditPanel } from './edit-panel';
export { FaultTree };
