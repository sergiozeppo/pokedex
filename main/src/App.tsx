import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from './views/Header/Header';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { usePagination } from './utils/usePagination/usePagination';
import { INITIAL_PAGE, POKEMONS_ON_PAGE } from './constants/constants';
import PokeLoader from './components/PokeLoader/PokeLoader';
import { useGetPokemonsQuery, useSearchPokemonsQuery } from './services/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { setAllPokemons } from './store/reducers/allPokemonsSlice';
import { setCurrentPokemons } from './store/reducers/currentPokemonsSlice';
import { Pokemon } from './types/types';
import AppRoutes from './components/AppRoutes/AppRoutes';
import PaginationControls from './components/PaginationControls/PaginationControls';

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const {
    data: allPokemons = [],
    isError,
    error,
  } = useGetPokemonsQuery(undefined);

  useEffect(() => {
    if (allPokemons) {
      dispatch(setAllPokemons(allPokemons));
    }
  }, [allPokemons, dispatch]);

  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(
    searchParams.get('page') || INITIAL_PAGE.toString()
  );

  const searchQuery = useSelector(
    (state: RootState) => state.searchQuerySlice.value
  );
  const trimmedQuery = searchQuery.trim();
  const getAllResult = useGetPokemonsQuery(undefined, {
    skip: trimmedQuery !== '',
  });
  const searchResult = useSearchPokemonsQuery(trimmedQuery, {
    skip: trimmedQuery === '',
  });

  const currentInitData =
    trimmedQuery !== '' ? searchResult.data : getAllResult.data;

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
    setSearchParams({ page: page.toString(), q: searchQuery });
  }, [page, searchQuery, setSearchParams]);

  return (
    <div className="container">
      <ErrorBoundary>
        <Header />
        {isLoading ? (
          <PokeLoader />
        ) : isError ? (
          <div className="broken">
            <img
              className="broken-pokeball"
              src="/assets/img/broken-pokeball.png"
              alt=""
            />
            <span>Error: {(error as Error).message}</span>
          </div>
        ) : (
          <>
            <AppRoutes />
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

export default App;
