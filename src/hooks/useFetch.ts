import usePersistFn from '@/hooks/usePersistFn';
import { useState } from 'react';
import _ from 'lodash';

interface FetchProps {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  initialData?: any;
}

let loadingTime = 0;
export default function useFetch({ onSuccess, onError, initialData }: FetchProps) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const fetch = usePersistFn((fetchHandler: () => Promise<any>) => {
    setLoading(true);
    loadingTime = Date.now();

    fetchHandler()
      .then((response) => {
        setData(response);
        if (onSuccess) onSuccess(response);
      })
      .catch(onError)
      .finally(() => {
        // 优化loading显示
        if (Date.now() - loadingTime < 200) {
          setTimeout(setLoading, 200, false);
        } else {
          setLoading(false);
        }
      });
  });

  return {
    data,
    fetch,
    loading,
  };
}
