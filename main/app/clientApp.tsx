'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
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
}

const ClientApp = ({ serverData }: ClientAppProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  useEffect(() => {
    if (serverData) {
      dispatch(setAllPokemons(serverData));
    }
  }, [serverData, dispatch]);

  const searchQuery = useSelector(
    (state: RootState) => state.searchQuerySlice.value
  );
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
  } = usePagination(
    currentData || [],
    typeof window !== 'undefined'
      ? parseInt(localStorage.getItem('pokemonPage') || INITIAL_PAGE.toString())
      : INITIAL_PAGE,
    POKEMONS_ON_PAGE
  );

  useEffect(() => {
    if (paginatedData) {
      dispatch(setCurrentPokemons(paginatedData));
      router.replace(`/?page=${page}&q=${searchQuery}`, { scroll: false });
    }
  }, [paginatedData, page, searchQuery]);

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
            />
          )}
        </>
      )}
    </>
  );
};

export default ClientApp;
