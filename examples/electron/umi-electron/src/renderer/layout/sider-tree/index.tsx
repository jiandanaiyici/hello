/** 左侧导航树 */
import React from 'react';
import { List, Collapse, message } from 'antd';
import styles from './style.less';

import { folders } from '../../../mock';

const { Panel } = Collapse;

const text = (
  <p style={{ paddingLeft: 24 }}>
    A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households across
    the world.
  </p>
);

const SiderTree = React.memo(() => {
  return (
    <div className={styles['sider-tree']}>
      <div className={styles['sider-tree-header']}>
        <h5 className={styles['sider-tree-title']}>测试</h5>
      </div>
      <div className={styles['sider-tree-content']}>
        <Collapse bordered={false} defaultActiveKey={['1']}>
          {folders.map((item) => {
            return (
              <Panel
                key={item.key}
                header={item.name}
                disabled={item.children.length === 0}
              >
                {Array.isArray(item.children) && item.children.length > 0 && (
                  <List
                    rowKey="taskId"
                    dataSource={item.children}
                    renderItem={(task) => (
                      <div
                        onClick={() => {
                          message.success(task.taskId);
                        }}
                        className={styles['task-wrapper']}
                      >
                        {task.taskName}
                      </div>
                    )}
                  />
                )}
              </Panel>
            );
          })}
        </Collapse>
      </div>
    </div>
  );
});

export default SiderTree;
