import { useState, useMemo, useCallback, useEffect } from 'react';
import { Pokemon } from '../../types/types';

export function usePagination(
  data: Pokemon[],
  initialPage: number = 1,
  limit: number = 20
) {
  const [page, setPage] = useState(initialPage);

  const totalPages = useMemo(
    () => Math.ceil(data.length / limit),
    [data, limit]
  );

  useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [page, totalPages]);

  const currentData = useMemo(() => {
    const startIndex = (page - 1) * limit;
    return data.slice(startIndex, startIndex + limit);
  }, [data, page, limit]);

  const nextPage = useCallback(() => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 1));
  }, []);

  return { currentData, page, totalPages, setPage, nextPage, prevPage };
}
