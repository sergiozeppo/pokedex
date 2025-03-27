import './CardList.css';
import Card from '../Card/Card';
import PokeLoader from '../PokeLoader/PokeLoader';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

function CardList() {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const navigate = useNavigate();
  const currentPokemons = useSelector(
    (state: RootState) => state.currentPokemonsSlice.pokemons
  );

  return (
    <>
      <div className="card-list" onClick={() => navigate('/')}>
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
