import React, { useMemo, Fragment } from 'react';
import { Table, Button, Modal, Drawer, Space } from 'antd';
import { useDetail } from '../../index';
import { list, DetailData } from './_mock';

const baseColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];

export default () => {
  const [state, _, { show, hide }] = useDetail<DetailData>();
  const [drawer, , { show: showDrawer, hide: hideDrawer }] = useDetail<
    DetailData
  >();
  const columns = useMemo(
    () => [
      ...baseColumns,
      {
        title: '操作',
        key: 'actions',
        dataIndex: 'actions',
        render: (_: any, record: DetailData) => (
          <Space>
            <Button
              type="link"
              onClick={() => {
                show(record);
              }}
            >
              Modal
            </Button>
            <Button
              type="link"
              onClick={() => {
                showDrawer(record);
              }}
            >
              Drawer
            </Button>
          </Space>
        ),
      },
    ],
    [show, hide],
  );

  const title = useMemo(() => state.data?.name, [state.data]);

  return (
    <Fragment>
      <Table
        size="small"
        rowKey="id"
        columns={columns}
        pagination={false}
        dataSource={list}
      />
      <Modal visible={state.visible} title={title} onCancel={hide} onOk={hide}>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </Modal>
      <Drawer
        visible={drawer.visible}
        title={drawer.data?.name}
        onClose={hideDrawer}
        width={500}
      >
        <pre>{JSON.stringify(drawer, null, 2)}</pre>
      </Drawer>
    </Fragment>
  );
};
