import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import './CardDetails.css';
import { fetchPokemonDetails } from '../../services/api';
import { PokemonData } from '../../types/types';
import PokeLoader from '../../components/PokeLoader/PokeLoader';

const CardDetails = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        if (!name) return;

        setIsLoading(true);
        const data = await fetchPokemonDetails(name);
        setPokemonData(data);
        setError(null);
      } catch {
        setError('Failed to load Pokémon details');
      } finally {
        setIsLoading(false);
      }
    };

    loadDetails();
  }, [name]);

  if (!name) return <div className="card-details">No Pokémon selected</div>;

  return (
    <div className="card-details">
      <Link to="/" className="close-button">
        ×
      </Link>

      {isLoading ? (
        <PokeLoader />
      ) : error ? (
        <div className="error">{error}</div>
      ) : pokemonData ? (
        <>
          <div className="details-header">
            {/* <h2>{pokemonData.name}</h2> */}
            <span className="pokemon-id">
              #{pokemonData.id.toString().padStart(3, '0')}
            </span>
          </div>

          <img
            src={
              pokemonData.sprites.other['official-artwork'].front_default ||
              './assets/img/poke-loader.png'
            }
            // alt={pokemonData.name}
            className="detail-image"
          />

          <div className="stats-section">
            <h3>Abilities</h3>
            <ul className="abilities-list">
              {pokemonData.abilities.map((ability, index) => (
                <li key={index}>{ability.ability.name}</li>
              ))}
            </ul>

            <h3>Stats</h3>
            <div className="stats-grid">
              {/* {pokemonData.stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <span className="stat-name">{stat.stat.name}</span>
                  <span className="stat-value">{stat.base_stat}</span>
                </div>
              ))} */}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default CardDetails;
