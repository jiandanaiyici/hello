import { useMemo } from 'react';
import { useRequest } from 'ahooks';

export type FieldType = 'result' | 'data' | string;
const getType = (value: any) => Object.prototype.toString.call(value);

export default <T = any, R = any, Q = any>(
  queryService: (args?: Q) => Promise<T>,
  defaultData: R,
  fieldType: FieldType = 'data',
) => {
  const { data, params, loading, run } = useRequest<T>(
    (queryParams: Q) => queryService(queryParams),
    {
      manual: true,
    },
  );

  const defaultDataType = useMemo(() => getType(defaultData), [defaultData]);
  const result: T = useMemo(() => {
    if (data && (data as any).success && (data as any)[fieldType as string]) {
      return defaultDataType === getType((data as any)[fieldType as string])
        ? (data as any)[fieldType as string]
        : defaultData;
    }
    return defaultData;
  }, [data]);

  return [result, run, loading, { params }] as const;
};
