import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { fetchPokemonDetails } from '../../services/api';
import './Card.css';
import { PokemonData, PokemonDetails } from '../../types/types';
import CardLoader from '../CardLoader/CardLoader';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPokemon,
  unselectPokemon,
} from '../../store/reducers/selectedPokemonsSlice';
import { RootState } from '../../store';

type CardProps = {
  name: string;
};

const Card = ({ name }: CardProps) => {
  const dispatch = useDispatch();
  const selectedPokemons = useSelector(
    (state: RootState) => state.selectedPokemonsSlice
  );
  const [id, setId] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [abilities, setAbilities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleCheckboxChange = (pokemon: PokemonDetails) => {
    if (selectedPokemons.some((poke) => poke.id === pokemon.id)) {
      dispatch(unselectPokemon(pokemon.id));
    } else {
      dispatch(selectPokemon(pokemon));
    }
  };

  useEffect(() => {
    const loadPokemonData = async () => {
      try {
        setIsLoading(true);
        const pokemonData: PokemonData = await fetchPokemonDetails(name);

        setId(pokemonData.id);
        setImageUrl(
          pokemonData.sprites.other.dream_world.front_default ||
            pokemonData.sprites.other['official-artwork'].front_default ||
            pokemonData.sprites.front_default ||
            '../assets/img/poke-loader.png'
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
          <Link to={`/pokemon/${name}`} onClick={(e) => e.stopPropagation()}>
            <div className="checkbox-cont">
              <label
                className="red-checkbox"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  className="card-checkbox"
                  type="checkbox"
                  checked={selectedPokemons.some((poke) => poke.id === id)}
                  onChange={() =>
                    handleCheckboxChange({ id, name, imageUrl, abilities })
                  }
                  onClick={(e) => e.stopPropagation()}
                />
                <span></span>
              </label>
              <span className="card-number">{formattedId}</span>
            </div>

            <img className="card-img" src={imageUrl} alt={name} />
            <div className="card-title">
              <h3>{name}</h3>
              <p>Abilities: {abilities.join(', ')}</p>
            </div>
          </Link>
        </>
      )}
    </div>
  );
};

export default Card;
