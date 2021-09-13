import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Layout, Space } from 'antd';

import './db.ts';

import './index.css';

const root = document.getElementById('root');

const { Sider, Header, Content } = Layout;

const App = () => {
  return (
    <Layout>
      <Sider theme="light">Sider</Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Space>
            <Button type="link">新建任务</Button>
            <Button type="link">新建分组</Button>
            <Button type="link">清空分组</Button>
          </Space>
        </Header>
        <Content>content</Content>
      </Layout>
    </Layout>
  );
};

function render() {
  ReactDOM.render(<App />, root);
}

render();
