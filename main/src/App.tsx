import { useState, useCallback, useRef } from 'react';
import Header from './views/Header/Header';
import { fetchData, fetchSearchData } from './services/api';
import './App.css';
import Main from './views/Main/Main';
import { Pokemon } from './types/types';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import useLSSavedSearch from './utils/useLSSavedSearch/useLSSavedSearch';
import { usePagination } from './utils/usePagination/usePagination';

const App = () => {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const allPokemonsRef = useRef<Pokemon[]>([]);
  allPokemonsRef.current = allPokemons;

  const handleFetchData = useCallback(async () => {
    setIsFetching(true);
    setError(null);
    try {
      const data = await fetchData();
      setAllPokemons(data);
      setPokemons(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsFetching(false);
    }
  }, []);

  const handleSearchData = useCallback(
    async (searchData: string) => {
      const trimmedQuery = searchData.trim();
      setIsFetching(true);
      setError(null);
      setSearchQuery(trimmedQuery);

      if (!trimmedQuery) {
        localStorage.removeItem('searchPokemon');
        handleFetchData();
        return;
      }

      try {
        const filteredPokemons = await fetchSearchData(
          trimmedQuery,
          allPokemonsRef.current
        );
        setPokemons(filteredPokemons);
        localStorage.setItem('searchPokemon', trimmedQuery);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setPokemons([]);
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

  const { currentData, page, totalPages, nextPage, prevPage } = usePagination(
    pokemons,
    1,
    20
  );

  return (
    <div className="container">
      <ErrorBoundary>
        <Header
          onSearch={handleSearchData}
          searchQuery={searchQuery}
          onInputChange={handleInputChange}
        />
        {isFetching ? (
          <div className="pokeball-loader-container">
            <div className="pokeball-loader"></div>
          </div>
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
            <Main pokemons={currentData} />
            <div className="pagination">
              <button
                className="pagination-button"
                onClick={prevPage}
                disabled={page === 1}
              >
                Prev
              </button>
              <span>
                Page {page}/{totalPages}
              </span>
              <button
                className="pagination-button"
                onClick={nextPage}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default App;
