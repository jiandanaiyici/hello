import React from 'react';

const Unmount = () => {
  React.useEffect(() => {
    return () => {
      console.log('%c组件已经卸载了, 你想干啥 ?', 'color: red');
    };
  }, []);

  return <div>测试组件卸载是否生效</div>;
};

export default Unmount;
