import './CardList.css';
import { Pokemon } from '../../types/types';
import Card from '../Card/Card';
import PokeLoader from '../PokeLoader/PokeLoader';

interface CardListProps {
  pokemons: Pokemon[];
  isFetching: boolean;
}

function CardList({ pokemons, isFetching }: CardListProps) {
  if (isFetching) {
    return <PokeLoader />;
  }

  return (
    <div className="card-list">
      {Array.isArray(pokemons) && pokemons.length > 0 && !isFetching ? (
        pokemons.map((pokemon, index) => (
          <Card key={index} name={pokemon.name} />
        ))
      ) : (
        <p>No Pokémon available.</p>
      )}
    </div>
  );
}

export default CardList;
