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
import { useRouter } from 'next/router';
import { fetchData } from '../src/services/server';
import { GetServerSideProps, InferGetStaticPropsType } from 'next';

export const getServerSideProps = (async () => {
  const data = await fetchData();
  return { props: { data } };
}) satisfies GetServerSideProps<{ data: Pokemon[] }>;

const App = ({ data }: InferGetStaticPropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  useEffect(() => {
    if (data) {
      dispatch(setAllPokemons(data));
    }
  }, [data, dispatch]);

  const initialPage =
    typeof window !== 'undefined'
      ? parseInt(localStorage.getItem('pokemonPage'))
      : INITIAL_PAGE;

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
    currentInitData || (data as Pokemon[]),
    initialPage,
    POKEMONS_ON_PAGE
  );

  useEffect(() => {
    if (currentData) {
      dispatch(setCurrentPokemons(currentData));
    }
  }, [currentData, dispatch]);

  useEffect(() => {
    router.push(`/?page=${page || initialPage}&q=${searchQuery || ''}`);
  }, [page, searchQuery, initialPage]);

  return (
    <RootLayout>
      {isLoading ? (
        <PokeLoader />
      ) : (
        <>
          <Main />
          {!isLoading && currentData?.length > 0 && (
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
