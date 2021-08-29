import React, { useRef, useState, useEffect } from 'react';

import { Spin } from 'antd';
import TabGroup from 'electron-tabs';
import styles from './style.less';

// const { ipcRenderer } = window.electron;
// webFrame: 设置窗口
// const { app, Menu, MenuItem } = remote;

const ElectronTabContent = () => {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabGroupRef = useRef<TabGroup | null>(null);

  useEffect(() => {
    if (containerRef) {
      const tabGroup = new TabGroup({
        tabContainerSelector: '.etabs-tabgroup',
      });
      tabGroupRef.current = tabGroup;
      tabGroupRef.current.addTab({
        title: '测试一',
        src: 'https://baidu.com',
        visible: true,
        active: true,
      });
      const tab = tabGroup.addTab({
        title: 'Google',
        src: 'http://google.com',
      });

      tab.webview.addEventListener('dom-ready', () => {
        setLoading(false);
      });
    }
  }, [containerRef]);

  // useEffect(() => {
  //   // webFrame.executeJavaScript(`  const { app, Menu, MenuItem } = remote;const menu = new Menu()
  //   // menu.append(new MenuItem({ role: 'toggleDevTools' }))

  //   // app.on('browser-window-created', (event, win) => {
  //   //   win.webContents.on('context-menu', (e, params) => {

  //   //     //@ts-ignore
  //   //     menu.popup(win, params.x, params.y)
  //   //   })
  //   // })`);
  //   const handler = () => {
  //     ipcRenderer.invoke('show-context-menu');
  //   };
  //   window.addEventListener('contextmenu', handler);

  //   return () => {
  //     window.removeEventListener('contextmenu', handler);
  //   };
  // }, []);

  return (
    <div className={styles['electron-tabs-container']}>
      <div ref={containerRef} className="etabs-tabgroup">
        <div className="etabs-tabs"></div>
        <div className="etabs-buttons"></div>
      </div>
      <Spin spinning={loading}>
        <div className="etabs-views"></div>
      </Spin>
    </div>
  );
};

export default ElectronTabContent;
