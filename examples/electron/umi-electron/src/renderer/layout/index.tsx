/** 整体布局 */
import React, { useRef, useEffect, useState } from 'react';

import { Layout, Avatar } from 'antd';
import TabGroup from 'electron-tabs';

import SiderTree from './sider-tree';

import styles from './style.less';

// const { ipcRenderer } = window.electron;

// webFrame: 设置窗口
// const { app, Menu, MenuItem } = remote;

const { Header, Content, Sider } = Layout;

const PageLayout = React.memo(() => {
  const [state, setState] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabGroupRef = useRef<TabGroup | null>(null);
  const onCollapse = (collapsed: boolean) => {
    setState(collapsed);
  };

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

  useEffect(() => {
    if (containerRef) {
      const tabGroup = new TabGroup({
        tabContainerSelector: '.etabs-tabgroup',
      });

      tabGroupRef.current = tabGroup;
      tabGroupRef.current.addTab({
        title: '测试一',
        src: 'http://localhost:8000/#/task/111',
        visible: true,
        active: true,
      });
    }
  }, [containerRef]);

  return (
    <Layout style={{ minHeight: '100vh' }} className={styles['layout']}>
      <Sider collapsible collapsed={state} onCollapse={onCollapse}>
        <SiderTree />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row-reverse',
          }}
        >
          <Avatar
            size={32}
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </Header>
        <Content>
          <div ref={containerRef} className="etabs-tabgroup">
            <div className="etabs-tabs"></div>
            <div className="etabs-buttons"></div>
          </div>
          <div className="etabs-views"></div>
        </Content>
      </Layout>
    </Layout>
  );
});

export default PageLayout;
