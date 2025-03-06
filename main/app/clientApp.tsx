'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import PaginationControls from '../src/components/PaginationControls/PaginationControls';
import PokeLoader from '../src/components/PokeLoader/PokeLoader';
import { INITIAL_PAGE, POKEMONS_ON_PAGE } from '../src/constants/constants';
import {
  useGetPokemonsQuery,
  useSearchPokemonsQuery,
} from '../src/services/api';
import { usePagination } from '../src/utils/usePagination/usePagination';
import { RootState } from '../src/store';
import Main from '../src/views/Main/Main';
import { setAllPokemons } from '../src/store/reducers/allPokemonsSlice';
import { setCurrentPokemons } from '../src/store/reducers/currentPokemonsSlice';
import { Pokemon } from '../src/types/types';

interface ClientAppProps {
  serverData: Pokemon[];
  initialPage: number;
}

const ClientApp = ({ serverData, initialPage }: ClientAppProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  const currentPage =
    Number(searchParams?.get('page')) || initialPage || INITIAL_PAGE;

  const searchQueryFromStore = useSelector(
    (state: RootState) => state.searchQuerySlice.value
  );
  const searchQuery = searchParams?.get('q') || searchQueryFromStore || '';

  useEffect(() => {
    if (serverData) {
      dispatch(setAllPokemons(serverData));
    }
  }, [serverData, dispatch]);

  const trimmedQuery = searchQuery.trim();

  const { data: allPokemons } = useGetPokemonsQuery(undefined, {
    skip: trimmedQuery !== '',
  });

  const { data: searchResults } = useSearchPokemonsQuery(trimmedQuery, {
    skip: trimmedQuery === '',
  });

  const currentData = trimmedQuery ? searchResults : allPokemons || serverData;

  const {
    currentData: paginatedData,
    page,
    totalPages,
    nextPage,
    prevPage,
  } = usePagination(currentData || [], currentPage, POKEMONS_ON_PAGE);

  useEffect(() => {
    if (paginatedData) {
      dispatch(setCurrentPokemons(paginatedData));
      router.replace(`/?page=${page}&q=${searchQuery}`, { scroll: false });
    }
  }, [paginatedData, page, searchQuery]);

  const handlePageChange = (newPage: number) => {
    const currentParams = searchParams
      ? new URLSearchParams(searchParams.toString())
      : new URLSearchParams();

    currentParams.set('page', newPage.toString());

    if (newPage === 1) {
      currentParams.delete('page');
    }

    const queryString = currentParams.toString();
    router.replace(queryString ? `?${queryString}` : '', { scroll: false });
  };

  return (
    <>
      {isLoading ? (
        <PokeLoader />
      ) : (
        <>
          <Main />
          {!isLoading && paginatedData?.length > 0 && (
            <PaginationControls
              page={page}
              totalPages={totalPages}
              nextPage={nextPage}
              prevPage={prevPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </>
  );
};

export default ClientApp;
