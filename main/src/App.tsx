import { useState, useEffect } from 'react';
import { Route, Routes, useSearchParams, Navigate } from 'react-router-dom';
import Header from './views/Header/Header';
import './App.css';
import Main from './views/Main/Main';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { usePagination } from './utils/usePagination/usePagination';
import NotFound from './views/NotFound/NotFound';
import { INITIAL_PAGE, POKEMONS_ON_PAGE } from './constants/constants';
import PokeLoader from './components/PokeLoader/PokeLoader';
import { useGetPokemonsQuery, useSearchPokemonsQuery } from './services/api';
import CardDetails from './views/CardDetails/CardDetails';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { setAllPokemons } from './store/reducers/allPokemonsSlice';
import { setCurrentPokemons } from './store/reducers/currentPokemonsSlice';
import { Pokemon } from './types/types';

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

  const [showPagination, setShowPagination] = useState(true);
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
      setShowPagination(false);
      dispatch(setCurrentPokemons(currentData));
      setShowPagination(true);
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
            <Routes>
              <Route path="/" element={<Main />}>
                <Route path="pokemon/:name" element={<CardDetails />} />
              </Route>
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
            {!isLoading && showPagination && currentData.length > 0 && (
              <div className="pagination">
                <button
                  className="pagination-button"
                  onClick={prevPage}
                  disabled={page === INITIAL_PAGE}
                >
                  Prev
                </button>
                <span>
                  {page} / {totalPages}
                </span>
                <button
                  className="pagination-button"
                  onClick={nextPage}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default App;
