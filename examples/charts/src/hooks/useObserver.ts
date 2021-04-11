import { useEffect, useRef } from "react";

const useObserver = <T extends HTMLElement>(callback: ResizeObserverCallback, element: T | null) => {
  const observe = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (element && observe) {
      observe.current = new ResizeObserver(callback);
      observe.current.observe(element);
    }

    return () => {
      if (element && observe.current) {
        observe.current.disconnect();
      }
    }

  }, [element, callback, observe]);
}

export default useObserver;