import { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';

export default <T = any>(
  service: (payload?: any) => Promise<T>,
  callback?: <TT, U>(queryParams?: TT, result?: U) => void,
  opts?: { onError?: (e: Error, params: any) => void },
) => {
  const { data, run, loading, params } = useRequest(
    (payload: any) => {
      service(payload);
    },
    {
      manual: true,
      onError: opts?.onError,
    },
  );

  const [success, set] = useState(data && data.success);

  useEffect(() => {
    set(data && data.succss);
  }, [data]);

  useEffect(() => {
    if (success && typeof callback === 'function') {
      set(false);
      callback(params, data);
    }
  }, [success]);

  return [run, loading, { success, set, params }] as const;
};
