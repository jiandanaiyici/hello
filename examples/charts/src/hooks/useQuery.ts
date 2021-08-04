import { useCallback, useState } from "react";

const useQuery = <T = any>(service: any, defaultData: T) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T>(defaultData);

  const query = useCallback(async (...args: any[]) => {
    setLoading(true);
    try {
      const response = await service();
      setData(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [service]);

  return [data, query, loading] as const;
}

export default useQuery;