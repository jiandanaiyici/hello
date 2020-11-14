import { useRef, useEffect, useCallback } from 'react';
import { startStop } from '../contants/fn';

export interface TimeoutOpts {
  /** 首次是否立即执行  */
  immediate?: boolean;
  /** 是否可以手动触发: true: 自动, false: 手动 */
  manual?: boolean;
}

export default (
  fn: () => void,
  delay: undefined | null | number,
  opts?: TimeoutOpts,
) => {
  const timerRef = useRef<number | null>(null);
  const ref = useRef<StartStop>(startStop);
  const fnRef = useRef<() => void>();

  fnRef.current = fn;

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);
  const start = useCallback(() => {
    if (typeof delay === 'number') {
      stop();
      // @ts-ignore
      timerRef.current = setTimeout(() => {
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
