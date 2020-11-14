import { useState, useCallback } from 'react';

export interface TipState<T> {
  visible: boolean;
  data?: T;
}

const useTip = <T>(initState?: T) => {
  const [state, setState] = useState<TipState<T>>({
    visible: false,
    data: initState,
  });

  const show = useCallback(
    (data: T) => {
      setState({ visible: true, data });
    },
    [setState],
  );

  const hide = useCallback(() => {
    setState({
      visible: false,
      data: initState,
    });
  }, [setState]);

  return [state, setState, { show, hide }] as const;
};

export default useTip;
