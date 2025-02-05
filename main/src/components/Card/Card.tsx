import { useState, useEffect } from 'react';
import { fetchPokemonDetails } from '../../services/api';
import './Card.css';
import { PokemonData } from '../../types/types';
import CardLoader from '../CardLoader/CardLoader';

type CardProps = {
  name: string;
};

const Card = ({ name }: CardProps) => {
  const [id, setId] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [abilities, setAbilities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPokemonData = async () => {
      try {
        setIsLoading(true);
        const pokemonData: PokemonData = await fetchPokemonDetails(name);

        setId(pokemonData.id);
        setImageUrl(
          pokemonData.sprites.other.dream_world.front_default ||
            pokemonData.sprites.other['official-artwork'].front_default ||
            pokemonData.sprites.front_default
        );
        setAbilities(
          pokemonData.abilities.map((ability) => ability.ability.name)
        );
        setError(null);
      } catch {
        setError('Failed to load Pokémon details');
      } finally {
        setIsLoading(false);
      }
    };

    loadPokemonData();
  }, [name]);

  const formattedId = `#${id.toString().padStart(3, '0')}`;

  return (
    <div className="card">
      {isLoading ? (
        <CardLoader />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <span className="card-number">{formattedId}</span>
          <img className="card-img" src={imageUrl} alt={name} />
          <div className="card-title">
            <h3>{name}</h3>
            <p>Abilities: {abilities.join(', ')}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
