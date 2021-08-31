import React, { useCallback } from 'react';
import { Layout, Avatar, Button, notification } from 'antd';
import styles from './style.less';

const { Header, Content } = Layout;

const { ipcRenderer } = window.__ELECTRON_BRIDGE__;

interface IProps {
  tabMatched: boolean;
  children: any;
}

const BaseLayout = React.memo<IProps>((props) => {
  const openElectronTabsWindow = useCallback(async () => {
    const result = await ipcRenderer.invoke('OPEN_ELECTRON_TABS');
    if (result) {
      notification.success({
        message: '打开窗口',
        description: '打开多窗口成功!',
      });
    }
  }, []);

  return (
    <Layout className={styles['site-layout']}>
      <Header
        style={{
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {!props.tabMatched && (
          <Button type="primary" onClick={openElectronTabsWindow}>
            打开 electron-tabs 示例
          </Button>
        )}
        <Avatar
          size={32}
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
      </Header>
      <Content>{props.children}</Content>
    </Layout>
  );
});

export default BaseLayout;
