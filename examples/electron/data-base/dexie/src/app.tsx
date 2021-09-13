import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Layout, Space } from 'antd';

import './index.css';
// import useData from './useData';
import db from './db';
db.init();

db.getGroups().then((d) => {
  console.log(d, '>>>>>>>>>>>');
});

const root = document.getElementById('root');

const { Sider, Header, Content } = Layout;

const App = () => {
  // const [{ tasks, groups }, { addTask, addGroup, clearGroup }] = useData();

  // console.log(tasks, groups, 'tasks>>>>>>>>');

  return (
    <Layout>
      <Sider theme="light">Sider</Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Space>
            <Button type="link">新建任务</Button>
            <Button
              type="link"
              onClick={() => {
                db.addGroup({ groupName: '123' });
              }}
            >
              新建分组
            </Button>
            <Button type="link">清空分组</Button>
          </Space>
        </Header>
        <Content>{/* <pre>{JSON.stringify(tasks, null, 2)}</pre> */}</Content>
      </Layout>
    </Layout>
  );
};

function render() {
  ReactDOM.render(<App />, root);
}

render();
