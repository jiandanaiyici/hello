import React, { useRef } from 'react';
// import { Dropdown, Menu } from 'antd';
import type { NsGraph } from '@antv/xflow';
import './index.less';

import { Menu, Dropdown } from '@antv/x6-react-components';
import '@antv/x6-react-components/es/menu/style/index.css';
import '@antv/x6-react-components/es/dropdown/style/index.css';

const menu = (
  <Menu>
    <Menu.Item key="1">1st menu item</Menu.Item>
    <Menu.Item key="2">2nd menu item</Menu.Item>
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
);

const EventNode: NsGraph.INodeRender = (props) => {
  console.log(props, 'props>>>>>>>>>>');
  const spanRef = useRef<HTMLSpanElement | null>(null);

  return (
    <div className="react-node">
      <Dropdown
        overlay={menu}
        getPopupContainer={() => spanRef.current as HTMLSpanElement}
      >
        <span ref={spanRef}>{props.data.label}</span>
      </Dropdown>
    </div>
  );
};

export default EventNode;
