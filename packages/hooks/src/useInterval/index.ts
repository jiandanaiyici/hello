import { useRef, useEffect, useCallback } from 'react';
import { startStop } from '../contants/fn';

export interface IntervalOpts {
  /** 首次是否立即执行  */
  immediate?: boolean;
  /** 是否可以手动触发: true: 自动, false: 手动 */
  manual?: boolean;
}

const useInterval = (
  fn: () => void,
  delay: undefined | null | number,
  opts?: IntervalOpts,
) => {
  const timerRef = useRef<number | null>(null);
  const ref = useRef<StartStop>(startStop);
  const fnRef = useRef<() => void>();

  fnRef.current = fn;

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);
  const start = useCallback(() => {
    if (typeof delay === 'number') {
      stop();
      // @ts-ignore
      timerRef.current = setInterval(() => {
        fnRef.current?.();
      }, delay);
    }
  }, [delay]);

  useEffect(() => {
    const isInvalid = delay === undefined || delay === null;

    ref.current = isInvalid ? startStop : { start, stop };

    if (opts?.immediate) {
      fnRef.current?.();
    }

    if (opts?.manual) {
      ref.current.start();
    }

    return ref.current.stop;
  }, [delay]);

  return { ...ref.current } as const;
};

export default useInterval;
