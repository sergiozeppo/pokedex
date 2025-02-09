import './CardList.css';
import { Pokemon } from '../../types/types';
import Card from '../Card/Card';
import PokeLoader from '../PokeLoader/PokeLoader';
import { useNavigate } from 'react-router';

interface CardListProps {
  pokemons: Pokemon[];
  isFetching: boolean;
}

function CardList({ pokemons, isFetching }: CardListProps) {
  const navigate = useNavigate();
  if (isFetching) {
    return <PokeLoader />;
  }

  return (
    <div className="card-list" onClick={() => navigate('/')}>
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
