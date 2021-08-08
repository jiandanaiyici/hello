import React from 'react';
import { useChange } from '../../hooks';

const BindInput = () => {
  const [value, onChange, { reset }] = useChange<string, 'value'>('');

  return (
    <div className="input-group mb-3">
      <input
        value={value}
        onChange={onChange}
        type="text"
        className="form-control"
        placeholder="输入名称"
        aria-label="输入名称"
        aria-describedby="button-addon2"
      />
      <button type="button" className="btn btn-primary" onClick={reset}>
        重置
      </button>
    </div>
  );
};

export default BindInput;
