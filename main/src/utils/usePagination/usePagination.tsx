import { useState, useMemo, useCallback, useEffect } from 'react';
import { Pokemon } from '../../types/types';
import { INITIAL_PAGE, POKEMONS_ON_PAGE } from '../../constants/constants';

export function usePagination(
  data: Pokemon[],
  initialPage: number = INITIAL_PAGE,
  limit: number = POKEMONS_ON_PAGE
) {
  const [page, setPage] = useState(initialPage);

  const totalPages = useMemo(() => {
    return data.length > 0 ? Math.ceil(data.length / limit) : 0;
  }, [data, limit]);

  useEffect(() => {
    if (data.length > 0 && page > totalPages) {
      setPage(INITIAL_PAGE);
    }
  }, [data, page, totalPages]);

  const currentData = useMemo(() => {
    const startIndex = (page - 1) * limit;
    return data.slice(startIndex, startIndex + limit);
  }, [data, page, limit]);

  const nextPage = useCallback(() => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, INITIAL_PAGE));
  }, []);

  return { currentData, page, totalPages, setPage, nextPage, prevPage };
}
