import React from 'react';
import { CanvasToolbar } from '@antv/xflow';
import { useToolbarConfig } from './config';

import './index.less';

const FaultTreeToolbar = () => {
  const config = useToolbarConfig();

  return (
    <CanvasToolbar
      layout="horizontal"
      config={config}
      position={{ top: 0, left: 0 }}
    />
  );
};

export { FaultTreeToolbar };
