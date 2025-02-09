import { useState, useCallback, useRef, useEffect } from 'react';
import {
  Route,
  Routes,
  useLocation,
  useSearchParams,
  Navigate,
} from 'react-router';
import Header from './views/Header/Header';
import { fetchData, fetchSearchData } from './services/api';
import './App.css';
import Main from './views/Main/Main';
import { Pokemon } from './types/types';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import useLSSavedSearch from './utils/useLSSavedSearch/useLSSavedSearch';
import { usePagination } from './utils/usePagination/usePagination';
import NotFound from './views/NotFound/NotFound';
import { INITIAL_PAGE, POKEMONS_ON_PAGE } from './constants/constants';
import CardDetails from './views/CardDetails/CardDetails';
import PokeLoader from './components/PokeLoader/PokeLoader';

const App = () => {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [showPagination, setShowPagination] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const allPokemonsRef = useRef<Pokemon[]>([]);
  allPokemonsRef.current = allPokemons;

  const handleFetchData = useCallback(async () => {
    setIsFetching(true);
    setError(null);
    setShowPagination(false);
    try {
      const data = await fetchData();
      setAllPokemons(data);
      setPokemons(data);
      setShowPagination(true);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      setShowPagination(false);
    } finally {
      setIsFetching(false);
    }
  }, []);

  const handleSearchData = useCallback(
    async (searchData: string) => {
      const trimmedQuery = searchData.trim();
      setIsFetching(true);
      setError(null);
      setShowPagination(false);
      setSearchQuery(trimmedQuery);

      if (!trimmedQuery) {
        localStorage.removeItem('searchPokemon');
        await handleFetchData();
        return;
      }

      try {
        const filteredPokemons = await fetchSearchData(
          trimmedQuery,
          allPokemonsRef.current
        );
        setPokemons(filteredPokemons);
        setShowPagination(true);
        localStorage.setItem('searchPokemon', trimmedQuery);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setPokemons([]);
        setShowPagination(false);
      } finally {
        setIsFetching(false);
      }
    },
    [handleFetchData]
  );

  const handleInputChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  useLSSavedSearch(handleFetchData, handleSearchData);

  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(
    searchParams.get('page') || INITIAL_PAGE.toString()
  );
  const { currentData, page, totalPages, nextPage, prevPage } = usePagination(
    pokemons,
    initialPage,
    POKEMONS_ON_PAGE
  );

  useEffect(() => {
    setSearchParams({ page: page.toString(), q: searchQuery });
  }, [page, searchQuery, setSearchParams]);

  const location = useLocation();
  const isNotFound = location.pathname === '/404';

  return (
    <div className="container">
      <ErrorBoundary>
        <Header
          onSearch={handleSearchData}
          searchQuery={searchQuery}
          onInputChange={handleInputChange}
        />
        {isFetching ? (
          <PokeLoader />
        ) : error ? (
          <div className="broken">
            <img
              className="broken-pokeball"
              src="/assets/img/broken-pokeball.png"
              alt=""
            />
            <span>Error: {error.message}</span>
          </div>
        ) : (
          <>
            <Routes>
              <Route
                path="/"
                element={
                  <Main pokemons={currentData} isFetching={isFetching} />
                }
              >
                <Route path="pokemon/:name" element={<CardDetails />} />
              </Route>
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>

            {showPagination && !isNotFound && currentData.length > 0 && (
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
