import React from 'react';

const ElectronTabs = () => {
  React.useEffect(() => {
    console.log('didmount');
    return () => {
      console.log('un mount');
    };
  }, []);

  return <div>electron tabs</div>;
};

export default ElectronTabs;
