import { useCallback, useState } from 'react';

interface IState<T> {
  visible: boolean;
  data?: T;
}

const useDetail = <T>(initialState?: T) => {
  const [state, setState] = useState<IState<T>>(() => ({
    visible: false,
    data: initialState,
  }));

  const show = useCallback(
    (data: T) => {
      setState({
        visible: true,
        data,
      });
    },
    [setState],
  );

  const hide = useCallback(() => {
    setState({
      visible: false,
      data: undefined,
    });
  }, [setState]);

  return [state, { show, hide }] as const;
};

export default useDetail;
