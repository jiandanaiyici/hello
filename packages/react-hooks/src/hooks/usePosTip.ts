import { useRef } from 'react';
import useMouseEvent from './useMouseEvent';
import useTip from './useTip';

type OffsetPos = [number, number];

interface PosState extends Omit<DOMRect, 'toJSON'> {
  offsetX?: number;
  offsetY?: number;
}

const initialState: PosState = {
  x: 0,
  y: 0,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: 0,
  height: 0,
  offsetX: undefined,
  offsetY: undefined,
};

const initOffset: OffsetPos = [16, 24];

const getContentRect = <T extends HTMLElement>(dom: T, pos: OffsetPos) => {
  const rect = dom.getBoundingClientRect() as PosState;
  const [x, y] = pos;
  const offsetX = x + rect.x;
  const offsetY = y + rect.y;

  return Object.assign(rect, {
    offsetX,
    offsetY,
  });
};

const usePosTip = <T extends HTMLElement>(
  containerRef: React.MutableRefObject<HTMLElement | null>,
  offsetPos = initOffset,
) => {
  const ref = useRef<T | null>(null);
  const [state, setState, { show, hide }] = useTip<PosState>(initialState);
  useMouseEvent(containerRef, 'mousemove', () => {
    if (ref.current && containerRef.current) {
      const dom = containerRef.current;
      const contentDom = ref.current;
      const { clientHeight, clientWidth } = dom;
      const contentRect = getContentRect(contentDom, offsetPos);
      const { width, offsetX, height, offsetY } = contentRect;
      const newX =
        width + offsetX >= clientWidth ? clientWidth - offsetX + 10 : offsetX;
      const newY =
        height + offsetY >= clientHeight
          ? clientHeight - offsetY + 10
          : offsetY;

      const rect = {
        ...contentRect,
        offsetX: newX,
        offsetY: newY,
      };

      show(rect);
    }
  });
  useMouseEvent(containerRef, 'mouseout', () => {
    hide();
  });

  return [state, setState, { show, hide }] as const;
};

export default usePosTip;
