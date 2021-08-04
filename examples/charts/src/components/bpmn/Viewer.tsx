import React, { useEffect, useRef, useState } from 'react';
import BpmnJS from 'bpmn-js';
import type { BpmnOptions } from 'bpmn-js';

import FullSpin from '../FullSpin';
import './index.less';

interface IProps extends BpmnJSProps {
  width?: number | string;
  height?: number | string;
  onLoaded?(instance: BpmnJS): void;
  toSvg?(): SVGAElement;
  toXml?(): XMLDocument;
  options?: Omit<BpmnOptions, 'container'>;
  // loading?: boolean;
  // xmlData?: string;
}

const Viewer = React.forwardRef<any, IProps>((props, ref) => {
  const { loading, width, height, onLoaded, xmlData, options } = props;

  const bpmnRef = useRef<HTMLDivElement | null>(null);
  const [intsance, setIntsance] = useState<BpmnJS | null>(null);

  useEffect(() => {
    if (bpmnRef.current) {
      // @ts-ignore
      const ints = new BpmnJS({ container: bpmnRef.current, ...(options ?? {}) });

      if (onLoaded) {
        onLoaded(ints);
      }

      /** 事件绑定 */
      setIntsance(ints);
      const canvas = ints.get('canvas');

      // @ts-ignore
      canvas.zoom('fit-viewport');
    }
  }, [options]);

  useEffect(() => {
    if (xmlData && intsance) {
      intsance.importXML(xmlData);
    }
  }, [xmlData, intsance]);

  return (
    <FullSpin loading={loading}>
      <div style={{ width, height }} ref={bpmnRef} />
    </FullSpin>
  );
});

Viewer.defaultProps = {
  loading: false,
  width: '100%',
  height: 500,
};

export default Viewer;
