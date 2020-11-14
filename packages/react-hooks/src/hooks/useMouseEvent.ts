import { useEffect } from 'react';

const useMouseEvent = (
  ref: React.MutableRefObject<HTMLElement | null>,
  eventName: keyof HTMLElementEventMap,
  handler: EventListener,
  options?: boolean | AddEventListenerOptions,
) => {
  useEffect(() => {
    if (!ref.current?.addEventListener) {
      console.error('未匹配到正确的节点');
      return;
    }

    if (!eventName) {
      console.error('没有匹配到的事件');
      return;
    }

    ref.current.addEventListener(eventName, handler, options);

    return () => {
      ref.current?.removeEventListener(eventName, handler, options);
    };
  }, [ref]);
};

export default useMouseEvent;
