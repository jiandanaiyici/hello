import React, { useState } from 'react';
import LabelFilter from '.';
import ExpandDropdown from '../ExpandDropdown';

const mock = Array(100)
  .fill(1)
  .map((_: any, idx: number) => ({
    label: `${idx}`,
    value: `${idx}`,
  }));

const LabelFilterDemo = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [value, setValue] = useState();

  return (
    <ExpandDropdown
      visible={visible}
      onVisibleChange={(v) => {
        setVisible(v);
      }}
      footer={{
        onCancel() {
          setVisible(false);
        },
      }}
      triggerNode={<LabelFilter content={value} opened={visible} />}
    >
      <ul style={{ maxHeight: 400, overflow: 'auto' }}>
        {mock.map((item) => (
          <li
            style={{ border: '1px #f47d31 solid', padding: 5, cursor: 'pointer' }}
            key={item.value}
            onClick={() => {
              setValue(item.value);
              setVisible(false);
            }}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </ExpandDropdown>
  );
};

export default LabelFilterDemo;
