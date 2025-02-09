import './CardList.css';
import { Pokemon } from '../../types/types';
import Card from '../Card/Card';
import PokeLoader from '../PokeLoader/PokeLoader';
import { Link } from 'react-router';

interface CardListProps {
  pokemons: Pokemon[];
  isFetching: boolean;
}

function CardList({ pokemons, isFetching }: CardListProps) {
  if (isFetching) {
    return <PokeLoader />;
  }

  return (
    <Link to="/">
      <div className="card-list">
        {Array.isArray(pokemons) && pokemons.length > 0 && !isFetching ? (
          pokemons.map((pokemon, index) => (
            <Card key={index} name={pokemon.name} />
          ))
        ) : (
          <p>No Pokémon available.</p>
        )}
      </div>{' '}
    </Link>
  );
}

export default CardList;
