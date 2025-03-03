// import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useRouter } from 'next/router';
// import PokemonLayout from '../../../pages/pokemon/PokemonLayout';
import Card from '../Card/Card';
import PokeLoader from '../PokeLoader/PokeLoader';
import styles from './CardList.module.css';

function CardList() {
  const router = useRouter();
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  // const navigate = useNavigate();
  const currentPokemons = useSelector(
    (state: RootState) => state.currentPokemonsSlice.pokemons
  );

  return (
    <>
      <div className={styles['card-list']} onClick={() => router.push('/')}>
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
