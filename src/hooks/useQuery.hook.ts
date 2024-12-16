import { useEffect, useState } from "react";

export function useQuery<T>(
  queryFn: (args: any) => Promise<T>,
  variables: any = undefined
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<T>();
  useEffect(() => {
    queryFn(variables)
      .then((data: any) => {
        setData(data);
        setLoading(false);
        setError(false);
      })
      .catch((error: any) => {
        setError(true);
        setLoading(false);
        setData(undefined);
      });
  }, [variables]);
  return { loading, error, data };
}
