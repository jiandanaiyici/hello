import React from 'react';
import { Layout, Avatar, Button } from 'antd';
import styles from './style.less';

const { Header, Content } = Layout;

console.log(window.electron, '>>>>>>>>>electron')
const BaseLayout = React.memo((props) => {
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
        <Button type="primary">打开 electron-tabs 示例</Button>
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
