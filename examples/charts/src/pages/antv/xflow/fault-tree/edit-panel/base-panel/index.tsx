import React, { useState } from 'react';
import cs from 'classnames';
import { omit } from 'lodash';
import { WorkspacePanel } from '@antv/xflow';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';

import { getPrefix } from '@/utils';

import { IFaultTreePanelProps } from '../interface';

import './index.less';

export const DEFAULT_EDIT_PANEL_WIDTH = 320;
export const CONTAINER_CLASS = 'edit-panel';
export const DEFAULT_POSITION: IFaultTreePanelProps['position'] = {
  width: DEFAULT_EDIT_PANEL_WIDTH,
  right: 0,
  top: 0,
  bottom: 0,
};
const basePrefix = getPrefix(CONTAINER_CLASS);

interface HandlerIconProps {
  placement: IFaultTreePanelProps['placement'];
  collpased: boolean;
}

const HandlerIcon = React.memo<HandlerIconProps>(({ collpased, placement }) => {
  if (placement === 'left') {
    return collpased ? <DoubleRightOutlined /> : <DoubleLeftOutlined />;
  }
  return collpased ? <DoubleLeftOutlined /> : <DoubleRightOutlined />;
});

const BasePanel = React.memo<IFaultTreePanelProps>((props) => {
  const {
    position = DEFAULT_POSITION,
    placement = 'right',
    defaultCollpased,
    classname,
    children,
    footer,
    header,
  } = props;
  const [collpased, setCollpased] = useState(defaultCollpased ?? false);

  const newPosition = omit(position, placement === 'left' ? 'right' : 'left');
  const { width = DEFAULT_EDIT_PANEL_WIDTH, top } = newPosition;
  const panelCls = cs(basePrefix, {
    [`${basePrefix}-collpased`]: collpased,
    [`${classname}`]: !!classname,
  });

  const openWidth = position[placement];

  return (
    <WorkspacePanel
      className={panelCls}
      style={{ height: `cacl(100%) - ${top}px` }}
      position={{
        ...newPosition,
        width,
        [placement]: !collpased ? openWidth : -width,
      }}
    >
      <div className={`${basePrefix}-wrapper`}>
        <div className={`${basePrefix}-header`}>{header}</div>
        <div className={`${basePrefix}-body`}>{children}</div>
        <div className={`${basePrefix}-footer`}>{footer}</div>
        <div
          className={`${basePrefix}-icon ${placement}`}
          onClick={() => {
            setCollpased(!collpased);
          }}
        >
          <HandlerIcon placement={placement} collpased={collpased} />
        </div>
      </div>
    </WorkspacePanel>
  );
});

export default BasePanel;
