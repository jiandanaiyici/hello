import React, { useEffect } from 'react';
import { Spin } from 'antd';
import { useQuery } from '../../index';

const queryService = () =>
  new Promise(resole => {
    setTimeout(() => {
      resole({
        success: true,
        data: '3S后返回的结果',
      });
    }, 3000);
  });

export default () => {
  const [data, query, loading] = useQuery(queryService, '', 'data');

  useEffect(() => {
    query();
  }, []);

  return <Spin spinning={loading}>{data}</Spin>;
};
