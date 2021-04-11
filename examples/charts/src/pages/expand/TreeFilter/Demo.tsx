import React from 'react';
import Editor from '@monaco-editor/react';
import { Row, Col } from 'antd';

import { data, hotData } from './data';
import TreeFilter from '.';

const allData = {
  hotData,
  data,
}

const TreeFilterDemo = () => {
  return (
    <Row style={{ height: '100%' }} gutter={32}>
      <Col span={12}>
        <Editor
          theme="dark"
          height="100%"
          width="100%"
          language="json"
          value={JSON.stringify(allData, null, 2)}
        />
      </Col>
      <Col span={12}>
        <TreeFilter dataSource={data} hotData={hotData} />
      </Col>
    </Row>
  );
};

export default TreeFilterDemo;
