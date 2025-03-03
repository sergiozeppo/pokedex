import Card from '../Card/Card';
import PokeLoader from '../PokeLoader/PokeLoader';
// import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import styles from './CardList.module.css';
// import PokemonLayout from '../../../pages/pokemon/PokemonLayout';
import { useRouter } from 'next/router';

function CardList() {
  const router = useRouter();
  const pokename = router.query.name as string;
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  // const navigate = useNavigate();
  const currentPokemons = useSelector(
    (state: RootState) => state.currentPokemonsSlice.pokemons
  );

  return (
    <>
      <div
        className={styles['card-list']}
        // onClick={() => navigate('/')}
      >
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
      {pokename && <p>{pokename}</p>}
    </>
  );
}

export default CardList;
