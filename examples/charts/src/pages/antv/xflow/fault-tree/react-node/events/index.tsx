import React, { useRef } from 'react';
import {
  IApplication,
  NsEdgeCmd,
  NsGraph,
  NsNodeCmd,
  useXFlowApp,
  uuidv4,
  XFlowEdgeCommands,
  XFlowNodeCommands,
} from '@antv/xflow';

import { Menu, Dropdown } from 'antd';
// import { Menu, Dropdown } from '@antv/x6-react-components';
// import '@antv/x6-react-components/es/menu/style/index.css';
// import '@antv/x6-react-components/es/dropdown/style/index.css';

import './index.less';

const NODE_COMMON_PROPS = {
  width: 160,
  height: 32,
} as const;

const addNode = async (app: IApplication, args: NsNodeCmd.AddNode.IArgs) => {
  const result = await app.executeCommand<
    NsNodeCmd.AddNode.IArgs,
    NsNodeCmd.AddNode.IResult
  >(XFlowNodeCommands.ADD_NODE.id, args);

  return result.contextProvider().getResult();
};

const addEdge = async (app: IApplication, args: NsEdgeCmd.AddEdge.IArgs) => {
  return app.executeCommand<NsEdgeCmd.AddEdge.IArgs, NsEdgeCmd.AddEdge.IResult>(
    XFlowEdgeCommands.ADD_EDGE.id,
    args
  );
};

const EventNode: NsGraph.INodeRender = (props) => {
  const domRef = useRef<HTMLDivElement | null>(null);
  const app = useXFlowApp();

  const onMenuItemClick = async ({ key }: { key: string }) => {
    if (key === 'add-node') {
      const node = await addNode(app, {
        nodeConfig: {
          id: uuidv4(),
          x: 100,
          y: 50,
          label: '新增节点',
          ...NODE_COMMON_PROPS,
        },
      });
    }

    if (key === 'add-node-edge') {
      const node = await addNode(app, {
        nodeConfig: {
          id: uuidv4(),
          x: 100,
          y: 50,
          label: '新增节点',
          ...NODE_COMMON_PROPS,
        },
      });

      if (!node.err) {
        addEdge(app, {
          edgeConfig: {
            id: uuidv4(),
            target: node.nodeConfig?.id as string,
            source: props.data.id,
          },
        });
      }
    }
  };

  const menu = (
    <Menu onClick={onMenuItemClick}>
      <Menu.Item key="add-node">新增节点</Menu.Item>
      <Menu.Item key="add-node-edge">新增节点 + 边</Menu.Item>
    </Menu>
  );

  return (
    <div className="react-node">
      <Dropdown
        overlay={menu}
        getPopupContainer={() => domRef.current as HTMLSpanElement}
      >
        <div ref={domRef}>{props.data.label}</div>
      </Dropdown>
    </div>
  );
};

export default EventNode;
