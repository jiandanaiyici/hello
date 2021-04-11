import React from 'react';

import { useBoolean } from 'ahooks';
import ExpandDropdown from '.';

const ExpandDropdownDemo = () => {
  const [visible, { setTrue, setFalse }] = useBoolean(false);

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ExpandDropdown
        title="自定义"
        extra="右侧占位"
        visible={visible}
        onVisibleChange={(v) => {
          if (v) {
            setTrue();
          } else {
            setFalse();
          }
        }}
        triggerNode="测试"
      >
        <div style={{ margin: '0 auto' }}>测试</div>
      </ExpandDropdown>
    </div>
  );
};

export default ExpandDropdownDemo;
