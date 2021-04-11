/**
 * 模拟下单
 * 1. 不受控模式完全不需要控制下拉是否有值
 */

import React, { useEffect, useState, useMemo } from 'react';
import { Table, Select, Row, Col, Button, Card } from 'antd';
import { useSetState } from 'ahooks';

import TableFooter from './Footer';
import useSet from '../../hooks/useSet';
import { intersect, difference } from '../../utils/arr';
import useQueryResult from '../../hooks/useQueryResult';
import { queryDataService } from './service';
import PreviewResult from './PreviewResult';

const { Option } = Select;

const UncontrolledOrder = () => {
  const [data, setData] = useState<PickProps.DisabledListItem[]>([]);
  const [params, setParams] = useSetState({
    pageNum: 1,
    pageSize: 5,
  });

  const [setKeys, { add, remove }] = useSet<string>([]);

  /** 缓存数据 */
  const [cacheData, updateCache] = useSetState<{
    keys: string[];
    data: PickProps.DisabledListItem[];
  }>({
    keys: [],
    data: [],
  });

  /** 请求分页 */
  const [result, loading, query] = useQueryResult<PickProps.ListResult>(
    queryDataService,
    {
      list: [],
      total: 0,
    },
  );
  const { list, total } = result;

  /** 回填 */
  useEffect(() => {
    const lastList = list.map(
      item =>
        cacheData.data.find(cacheItem => cacheItem.id === item.id) || item,
    );
    setData(lastList);
  }, [list]);

  /** 根据维护的 data 值获取所有的keys */
  const dataKeys = useMemo(() => new Set(data.map(item => item.id)), [
    data,
    setKeys,
  ]);

  useEffect(() => {
    const diff = difference(dataKeys, setKeys);
    updateCache(prevCache => {
      console.log(
        new Set(prevCache.data.concat(data).filter(item => !diff.has(item.id))),
        '>>>>>>>>>>>>>difff',
      );
      return {
        data: [
          ...new Set(
            prevCache.data.concat(data).filter(item => !diff.has(item.id)),
          ),
        ],
        keys: [
          ...new Set(
            prevCache.keys.concat(...dataKeys).filter(key => !diff.has(key)),
          ),
        ],
      };
    });
  }, [setKeys]);

  const { pageNum, pageSize } = params;

  const columns = [
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
    {
      title: '测试下拉',
      dataIndex: 'code',
      key: 'code',
      render: (text: string, record: PickProps.DisabledListItem) => {
        return (
          <Select
            allowClear
            placeholder="请选择"
            dropdownMatchSelectWidth
            style={{ width: 200 }}
            value={text || ''}
            onChange={val => {
              setData(prevData => {
                const arr = prevData.map(item =>
                  item.id === record.id ? { ...item, code: val } : item,
                );
                return arr;
              });
            }}
          >
            {record.publishData.map(item => (
              <Option value={item.code} key={item.code}>
                {item.codeName}
              </Option>
            ))}
          </Select>
        );
      },
    },
  ];

  /** 分页请求 */
  useEffect(() => {
    query(params);
  }, [params]);

  console.log(cacheData, '>>>>>>>>>>>>>.cacheData');

  const rowSelection: any = {
    fixed: true,
    selectedRowKeys: cacheData.keys,
    onChange(selectedRowKeys: string[], selectedRows: any[]) {
      console.log(selectedRowKeys, selectedRows, 'selectedRows>>>>>');
      /** 交集 */
      const interKeys = intersect(dataKeys, new Set(selectedRowKeys));
      add([...interKeys]);
      /** 差集 */
      const diffKeys = difference(dataKeys, new Set(selectedRowKeys));
      remove([...diffKeys]);
    },
  };

  const pagination = {
    total,
    pageSize,
    current: pageNum,
    showSizeChanger: false,
    showTotal: () => `共${total}条`,
    onChange(page: number) {
      setParams({ pageNum: page });
    },
  };

  const checkedTotal = useMemo(() => cacheData.data.length, [cacheData.data]);

  return (
    <Card
      title="非受控模式"
      extra={
        <Button type="primary">
          点击下一步时获取所有缓存数据并过滤未选择下拉框的数据
        </Button>
      }
    >
      <Row>
        <Col span={18}>
          <Table
            rowKey="id"
            size="small"
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={pagination}
            rowSelection={rowSelection}
            footer={() => {
              return <TableFooter total={checkedTotal} />;
            }}
          />
        </Col>
        <Col span={6}>
          <PreviewResult value={JSON.stringify(cacheData, null, 2)} />
        </Col>
      </Row>
    </Card>
  );
};

export default UncontrolledOrder;
