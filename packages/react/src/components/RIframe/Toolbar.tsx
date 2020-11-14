import React, { FC, useMemo, useCallback } from 'react';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import { ToolbarProps } from './types';
import styles from './toolbar.module.css';

const getIcon = (type, onClick: () => void) => {
  return {
    exited: <FullscreenOutlined onClick={onClick} />,
    fulled: <FullscreenExitOutlined onClick={onClick} />,
  }[type];
};

const ToolBar: FC<ToolbarProps> = (props) => {
  const icon = useMemo(() => {
    const type = props.isFullscreen ? 'fulled' : 'exited';
    const hander = props.isFullscreen ? props.onExit : props.onFull;
    return getIcon(type, hander);
  }, [props.isFullscreen]);

  return (
    <div className={styles.toolbar}>
      <span className={styles.full_icon}>{icon}</span>
    </div>
  );
};

export default ToolBar;
