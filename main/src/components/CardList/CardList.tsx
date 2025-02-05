import './CardList.css';
import { Pokemon } from '../../types/types';
import Card from '../Card/Card';

interface CardListProps {
  pokemons: Pokemon[];
}

function CardList({ pokemons }: CardListProps) {
  return (
    <div className="card-list">
      {Array.isArray(pokemons) && pokemons.length > 0 ? (
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
