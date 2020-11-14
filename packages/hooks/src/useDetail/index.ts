import { useState, useCallback } from 'react';

export interface State<T> {
  visible: boolean;
  data?: T;
}

const useDetail = <T>(initialState?: T) => {
  const [state, setState] = useState<State<T>>({
    visible: false,
    data: initialState,
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
      data: initialState,
    });
  }, [setState]);

  return [state, setState, { show, hide }] as const;
};

export default useDetail;
