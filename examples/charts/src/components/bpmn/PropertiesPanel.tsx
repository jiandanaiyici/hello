import React, { useEffect, useRef, useState } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';

import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda.json';

import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'; // 右边工具栏样式

const PropertiesPanel = React.memo<BpmnJSProps>(props => {
  const domRef = useRef<HTMLDivElement | null>(null);
  const [instance, setInstance] = useState<any>();

  useEffect(() => {
    if (domRef.current) {
      const ints = new BpmnModeler({
        container: domRef.current,
        // propertiesPanel: {
        //   parent: '#js-properties-panel'
        // },
        additionalModules: [propertiesPanelModule, propertiesProviderModule],
      });

      // ints.removeClass('with-diagram');
      setInstance(ints);
    }
  }, [domRef]);

  useEffect(() => {
    if (props.xmlData && instance) {
      instance.importXML(props.xmlData);
    }
  }, [instance, props.xmlData]);

  return (
    <div style={{ height: 500, width: '100%' }} ref={domRef} id="canvas" />
  );
});

export default PropertiesPanel;
