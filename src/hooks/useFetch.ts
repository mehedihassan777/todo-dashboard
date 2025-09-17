"use client";
import { useState, useEffect } from "react";

export function useFetch<T>(fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetcher()
      .then((res) => {
        if (isMounted) setData(res);
      })
      .catch(() => {
        if (isMounted) setError("Failed to fetch data.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [fetcher]);

  return { data, loading, error };
}
