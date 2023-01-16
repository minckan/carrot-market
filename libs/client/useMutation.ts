/* 
    react component
    function과 state를 return
*/

import { useState } from "react";

interface useMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

type useMutationResult<T> = [(data: any) => void, useMutationState<T>];

export default function useMutation<T = any>(url: string): useMutationResult<T> {
  const [state, setState] = useState<useMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<undefined | any>(undefined);
  const [error, setError] = useState<undefined | any>(undefined);
  function mutation(data: any) {
    setLoading(true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json().catch(() => { }))
      .then((json) => setData(json)) // .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }
  return [mutation, { loading, data, error }];
}
