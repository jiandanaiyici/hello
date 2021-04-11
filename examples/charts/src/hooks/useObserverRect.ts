import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useObserver from "./useObserver";


export default function useObserverRect<T extends HTMLElement>() {
  const domRef = useRef<T | null>(null);

  const initialState = useMemo(() => {
    if (domRef.current) {
      const el = domRef.current;
      return {
        width: el.clientWidth,
        height: el.clientHeight,
      }
    }

    return {};
  }, [domRef]);

  const [rect, setRect] = useState<Partial<DOMRectReadOnly>>(initialState);

  useEffect(() => { setRect(initialState) }, [initialState])

  const callback = useCallback((entries) => {
    for (let entry of entries) {
      setRect(entry.contentRect);
    }
  }, [domRef, setRect]);

  useObserver(callback, domRef.current);

  return [domRef, rect] as const;
}