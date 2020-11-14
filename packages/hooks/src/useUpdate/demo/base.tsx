import React, { useEffect } from 'react';
import { Button, message } from 'antd';
import { useUpdate } from '../../index';

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
  const [update, loading, { params }] = useUpdate(queryService, () => {
    message.success(`执行成功!${(params as any).id}`);
  });

  return (
    <Button
      loading={loading}
      onClick={() => {
        update({
          id: Date.now(),
        });
      }}
    >
      删除
    </Button>
  );
};
