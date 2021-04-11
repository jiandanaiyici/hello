import React from 'react';
import { Tabs } from 'antd';
import Controlled from './Controlled';
import Uncontrolled from './Uncontrolled';

const { TabPane } = Tabs;

const PickOrder = () => {
  return (
    <Tabs defaultActiveKey="uncontrolled">
      <TabPane tab="非受控模式" key="uncontrolled">
        <Uncontrolled />
      </TabPane>
      <TabPane tab="受控模式" key="controlled">
        <Controlled />
      </TabPane>
    </Tabs>
  );
};

export default PickOrder;
