import React, { Fragment, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { useQuery } from '@/hooks';

import { BpmnViewer, PropertiesPanel } from '@/components/bpmn';
import { allExample } from './contant';
import type { ExampleTypes } from './contant';
import { queryXmlDataService } from './service';

const BmpnChart = () => {
  const [value, setValue] = useState<ExampleTypes>('url-view');
  const [xmlData, queryXmlData, loading] = useQuery(queryXmlDataService);

  useEffect(() => {
    queryXmlData();
  }, [queryXmlData]);

  const props = {
    loading,
    xmlData,
  };

  return (
    <Fragment>
      <Tabs
        type="card"
        activeKey={value}
        onChange={(v) => {
          setValue(v as ExampleTypes);
        }}
      >
        {allExample.map((item) => (
          <Tabs.TabPane tab={item.label} key={item.key} />
        ))}
      </Tabs>
      <div style={{ height: 500 }}>
        {value === 'url-view' && <BpmnViewer {...props} />}
        {value === 'propertiesPanel' && <PropertiesPanel {...props} />}
      </div>
    </Fragment>
  );
};

export default BmpnChart;
