import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PaginationControls from '../src/components/PaginationControls/PaginationControls';
import PokeLoader from '../src/components/PokeLoader/PokeLoader';
import { INITIAL_PAGE, POKEMONS_ON_PAGE } from '../src/constants/constants';
import {
  useGetPokemonsQuery,
  useSearchPokemonsQuery,
} from '../src/services/api';
import { setAllPokemons } from '../src/store/reducers/allPokemonsSlice';
import { setCurrentPokemons } from '../src/store/reducers/currentPokemonsSlice';
import { Pokemon } from '../src/types/types';
import { usePagination } from '../src/utils/usePagination/usePagination';
import { RootState } from '../src/store';
import Main from '../src/views/Main/Main';
import RootLayout from './RootLayout';

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

  // const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = INITIAL_PAGE;
  // parseInt(searchParams.get('page') || INITIAL_PAGE.toString());

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

  // useEffect(() => {
  //   setSearchParams({ page: page.toString(), q: searchQuery });
  // }, [page, searchQuery, setSearchParams]);

  return (
    <RootLayout>
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
          {/* <AppRoutes /> */}
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
    </RootLayout>
  );
};

export default App;
