import React, { useMemo, Fragment } from 'react';
import { Table, Button, Modal } from 'antd';
import { list } from '../_mock';

import useTip from '@/hooks/useTip';

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

const Tip = () => {
  const [state, setState, { show, hide }] = useTip<TipSpace.TableData>();
  const columns = useMemo(
    () => [
      ...baseColumns,
      {
        title: '操作',
        key: 'actions',
        dataIndex: 'actions',
        render: (_: any, record: TipSpace.TableData) => (
          <Button
            type="link"
            onClick={() => {
              show(record);
            }}
          >
            Modal 详情
          </Button>
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
    </Fragment>
  );
};

export default Tip;
