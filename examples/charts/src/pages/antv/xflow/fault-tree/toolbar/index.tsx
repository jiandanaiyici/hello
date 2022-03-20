import React from 'react';
import { CanvasToolbar } from '@antv/xflow';
import { useToolbarConfig } from './config';

import './index.less';

// import { getPrefix } from "@/utils";

// const basePrefix = getPrefix("flow-toolbar");

const FaultTreeToolbar = () => {
  const config = useToolbarConfig();

  return <CanvasToolbar layout="horizontal" config={config} position={{}} />;
};

export { FaultTreeToolbar };
