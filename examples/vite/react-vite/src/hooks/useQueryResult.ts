import { useRequest } from 'ahooks';

const useQueryResult = <T>(queryService: any, defaultResult: T): [T, boolean, Function] => {
  const { data, loading, run } = useRequest<Required<T>>(queryService, {
    manual: true,
    initialData: defaultResult,
  });

  return [data, loading, run];
};

export default useQueryResult;
