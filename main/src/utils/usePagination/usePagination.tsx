import { useState, useMemo, useCallback } from 'react';
import { Pokemon } from '../../types/types';

export function usePagination(
  allPokemons: Pokemon[],
  initialPage: number = 1,
  limit: number = 20
) {
  const [page, setPage] = useState(initialPage);

  const totalPages = useMemo(
    () => Math.ceil(allPokemons.length / limit),
    [allPokemons, limit]
  );

  const currentData = useMemo(() => {
    const startIndex = (page - 1) * limit;
    return allPokemons.slice(startIndex, startIndex + limit);
  }, [allPokemons, page, limit]);

  const nextPage = useCallback(() => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 1));
  }, []);

  return { currentData, page, totalPages, setPage, nextPage, prevPage };
}
