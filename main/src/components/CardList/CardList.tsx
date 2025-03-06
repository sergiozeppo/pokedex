'use client';

import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useRouter } from 'next/navigation';
import Card from '../Card/Card';
import PokeLoader from '../PokeLoader/PokeLoader';
import styles from './CardList.module.css';

function CardList() {
  const router = useRouter();
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const currentPokemons = useSelector(
    (state: RootState) => state.currentPokemonsSlice.pokemons
  );

  const handleClick = () => {
    const currentPage =
      typeof window !== 'undefined'
        ? Number(localStorage.getItem('pokemonPage'))
        : 1;
    const currentSearchQuery =
      typeof window !== 'undefined'
        ? localStorage.getItem('searchPokemon')
        : '';
    router.replace(`/?page=${currentPage}&q=${currentSearchQuery || ''}`, {
      scroll: false,
    });
  };

  return (
    <>
      <div className={styles['card-list']} onClick={handleClick}>
        {isLoading && <PokeLoader />}
        {Array.isArray(currentPokemons) &&
        currentPokemons.length > 0 &&
        !isLoading ? (
          currentPokemons.map((pokemon, index) => (
            <Card key={index} name={pokemon.name} />
          ))
        ) : (
          <p>No Pokémon available.</p>
        )}
      </div>
    </>
  );
}

export default CardList;
