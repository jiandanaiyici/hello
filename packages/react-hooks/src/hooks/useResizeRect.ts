import { useLayoutEffect, useRef, useState, useCallback } from 'react';

const getResizeObserver = async () => {
  if ((window as any).ResizeObserver) {
    return (window as any).ResizeObserver;
  }
  return (await import('resize-observer-polyfill')).default;
};

declare const RectAttrTypes: [
  'x',
  'y',
  'left',
  'right',
  'top',
  'bottom',
  'width',
  'height',
];
export type RectAttrType = typeof RectAttrTypes[number];
export type EleRect = Pick<DOMRectReadOnly, RectAttrType>;

const initialState: EleRect = {
  x: 0,
  y: 0,
  top: 0,
  left: 0,
  right: 0,
  width: 0,
  bottom: 0,
  height: 0,
};

const useResizeRect = <T>() => {
  const ref = useRef<T | null>(null);
  const [rect, setRect] = useState<EleRect>(initialState);

  const handler = useCallback(async () => {
    const Observer = await getResizeObserver();
    const ob = new Observer((entries: any) => {
      if (entries[0]) {
        setRect(entries[0].contentRect as EleRect);
      }
    });

    ob.observe(ref.current);

    return () => {
      ob.disconnect();
    };
  }, [ref]);

  useLayoutEffect(() => {
    handler();
  }, [ref]);

  return [ref, rect] as const;
};

export default useResizeRect;
