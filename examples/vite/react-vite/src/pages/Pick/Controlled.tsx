/**
 * 模拟下单
 * 1. 进入时所有 code 均为空, 且不可选中
 * 2. 当切换选中了 测试下单的选择项放开 checkbox 选中状态, 可勾选可取消 否则不允许选择
 * 3. 当选中后: 如果是第一次操作则直接添加, 如果有缓存数据时 需要将其添加到缓存数据中, 同时更新维护的 所有选中keys(所以这里无论是否有选中的数据)
 * (1). 取当前所有数据的 keys 和 当前选中的 keys 进行交集排查得到被取消选中的 keys, 同时与所有选中 keys 进行做差集比较更新
 * (2). 同样的道理, 在 1 的基础上, 获取到了所有差集 keys 集合后,
 *      同当前页列表中的数据进行过滤(这里需要获取到选中的数据集合而不能单纯的获取到keys) 和 当前缓存数据进行合并(不能直接使用 set 合并,
 *      此时选中的数据已经获取到, 但和缓存中的数据类型字段不一样)
 * (3). 最终获取到已经合并后的 keys 和 全部选中的数据集合, 此时再更新选中的 keys 和 缓存数据
 *
 *
 * 4. 定义两个 hooks 参考 ahooks
 *    (1). useSet: ahooks 中的 useSet 只能用于传递的数据格式一致时有效, 而此前需要的场景是数据会根据下拉框选择进行变化
 *         从新定义 useSet 中的 remove add has reset 四种方法, 接收回调形式, 并增加 清空操作 clean
 *
 *    (2). useTableSelection: 和 useSet 有重合功能, 可考虑使用同一个方法, 也可将功能拆分开 在最终定义另一个方法将两种功能糅合在一起
 *
 */

import React, { useEffect, useState, useMemo } from 'react';
import { Card, Table, Select, Row, Col } from 'antd';
import { useSetState } from 'ahooks';

import TableFooter from './Footer';
import useSet from '../../hooks/useSet';
import { intersect, difference } from '../../utils/arr'
import useQueryResult from '../../hooks/useQueryResult';
import { queryDataService } from './service';
import PreviewResult from './PreviewResult';

const { Option } = Select;

const Controlled = () => {
  const [data, setData] = useState<PickProps.DisabledListItem[]>([]);
  const [params, setParams] = useSetState({
    pageNum: 1,
    pageSize: 5,
  });

  const [setKeys, { add, remove }] = useSet<string>([]);

  /** 缓存数据 */
  const [cacheData, updateCache] = useSetState<{
    data: PickProps.DisabledListItem[];
    keys: string[];
  }>({
    data: [],
    keys: [],
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

  useEffect(() => {
    const lastList = list.map(
      item =>
        cacheData.data.find(cacheItem => cacheItem.id === item.id) || item,
    );
    setData(lastList);
  }, [list]);

  /** @todo: @bug1 重复, 不能删除 */
  useEffect(() => {
    const arr = data.filter(item => setKeys.has(item.id));
    updateCache(prevCache => {
      const d = prevCache.data.concat(arr);
      const dKeys = new Set([...setKeys, ...prevCache.keys]);
      const ddd = [...dKeys].map(key => d.find(item => item.id === key));
      return {
        data: ddd,
        keys: [...setKeys],
      };
    });
  }, [setKeys]);

  /** 根据维护的 data 值获取所有的keys */
  const [dataKeys] = useMemo(() => {
    const baseKeys = data.map(item => item.id);
    return [new Set(baseKeys)];
  }, [data]);

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
            <Option value="">请选择</Option>
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

  const rowSelection: any = {
    fixed: true,
    selectedRowKeys: [...setKeys],
    onChange(selectedRowKeys: string[]) {
      /** 交集 */
      const interKeys = intersect(dataKeys, new Set(selectedRowKeys));
      add([...interKeys]);
      /** 差集 */
      const diffKeys = difference(dataKeys, new Set(selectedRowKeys));
      remove([...diffKeys]);
    },
    getCheckboxProps: (record: PickProps.DisabledListItem) => {
      /** 如果测试下拉为空 则不允许选择 */
      return {
        disabled: !record.code,
        /** @bug 当清空选择项时 */
        // checked: cacheData.keys.includes(record.id) && !!record.code,
      };
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
    <Card title="受控模式">
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
              /**
               * 全选:
               * 1. 取消全选时只会将当前页的所有项过滤, 重新设置缓存值(缓存数据 过滤当前页所有项)
               * 2. 半选中时 选中
               * 3. 全选中时 反选取消
               */
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

export default Controlled;
