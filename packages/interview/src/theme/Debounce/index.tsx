import React from 'react';
import { InputNumber, Button } from 'antd';

function debounce(fn, delay) {
  let timer = null;
  // 返回的 函数直接调用时的 This 通过默认规则指向了 window
  return function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    const context = this;
    const args = arguments;

    timer = setTimeout(() => {
      // 通过 apply 显示绑定方式将 this 执行重新进行绑定
      fn.apply(context, args);
    }, delay);
  };
}

const Debounce = () => {
  const [delay, setDelay] = React.useState(1);
  const [handerCount, setHandlerCount] = React.useState(0);
  const [state, setState] = React.useState(0);

  const handler = React.useCallback(
    debounce(() => {
      setHandlerCount((prevState) => prevState + 1);
    }, delay * 1000),
    [delay],
  );

  const clickHanlder = React.useCallback(() => {
    setState((prevState) => prevState + 1);
    handler();
  }, [setState, handler, delay]);
  console.log(`%c你点击的次数: ${state}`, 'color: red;');

  return (
    <React.Fragment>
      <Button type="primary" onClick={clickHanlder}>
        Click
      </Button>
      <p>
        设置延迟时间: &nbsp;
        <InputNumber
          max={5}
          size="small"
          step={1}
          value={delay}
          onChange={setDelay}
        />
      </p>
      <p>点击次数: {state}</p>
      <p>函数调用次数: {handerCount}</p>
    </React.Fragment>
  );
};

export default Debounce;
