import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from './views/Header/Header';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { usePagination } from './utils/usePagination/usePagination';
import { POKEMONS_ON_PAGE } from './constants/constants';
import PokeLoader from './components/PokeLoader/PokeLoader';
import { useSearchPokemonsQuery } from './services/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { setAllPokemons } from './store/reducers/allPokemonsSlice';
import { setCurrentPokemons } from './store/reducers/currentPokemonsSlice';
import { Pokemon } from './types/types';
import PaginationControls from './components/PaginationControls/PaginationControls';
import Main from './views/Main/Main';
import './App.css';

interface ClientAppProps {
  serverData?: Pokemon[];
  initialPage?: number;
  initialQuery?: string;
}

const ClientApp = ({
  serverData,
  initialPage,
  initialQuery,
}: ClientAppProps) => {
  const allPokemons = serverData;
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  useEffect(() => {
    if (allPokemons) {
      dispatch(setAllPokemons(allPokemons));
    }
  }, [allPokemons, dispatch]);

  const [, setSearchParams] = useSearchParams();

  const searchStoreQuery = useSelector(
    (state: RootState) => state.searchQuerySlice.value
  );
  const trimmedQuery = searchStoreQuery
    ? searchStoreQuery.trim()
    : initialQuery?.trim();

  const searchResult = useSearchPokemonsQuery(trimmedQuery || '', {
    skip: trimmedQuery === '',
  });

  const currentInitData = trimmedQuery !== '' ? searchResult.data : allPokemons;

  const { currentData, page, totalPages, nextPage, prevPage } = usePagination(
    currentInitData || (allPokemons as Pokemon[]),
    initialPage,
    POKEMONS_ON_PAGE
  );

  useEffect(() => {
    if (currentData) {
      dispatch(setCurrentPokemons(currentData));
    }
  }, [currentData, dispatch]);

  useEffect(() => {
    setSearchParams({ page: page.toString(), q: searchStoreQuery });
  }, [page, searchStoreQuery, setSearchParams]);

  return (
    <div className="container">
      <ErrorBoundary>
        <Header />
        {isLoading ? (
          <PokeLoader />
        ) : (
          <>
            <Main />
            {!isLoading && currentData.length > 0 && (
              <PaginationControls
                page={page}
                totalPages={totalPages}
                nextPage={nextPage}
                prevPage={prevPage}
              />
            )}
          </>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default ClientApp;
