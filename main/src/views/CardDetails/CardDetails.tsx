import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import './CardDetails.css';
import { fetchPokemonDetails } from '../../services/api';
import { PokemonColorPair, PokemonData } from '../../types/types';
import PokeLoader from '../../components/PokeLoader/PokeLoader';
import { usePokemonBackground } from '../../utils/usePokemonBackground/usePokemonBackground';

const CardDetails = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

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

  const colorsArray = usePokemonBackground(
    pokemonData?.types || []
  ) as PokemonColorPair[];

  const id = `#${pokemonData?.id.toString().padStart(3, '0')}`;

  const img =
    pokemonData?.sprites.other.dream_world.front_default ||
    pokemonData?.sprites.other['official-artwork'].front_default ||
    pokemonData?.sprites.front_default ||
    '../assets/img/poke-loader.png';

  if (!name) return <div className="card-details">No Pokémon selected</div>;

  return (
    <div
      className="card-details"
      style={{ background: colorsArray[0]?.primary || '#ccc' }}
    >
      {isLoading ? (
        <PokeLoader />
      ) : error ? (
        <div className="error">{error}</div>
      ) : pokemonData ? (
        <>
          <div className="details-container">
            <div className="details-header">
              <div className="details-title">
                <div className="details-close" onClick={handleClick}></div>

                <span className="details-h2">{pokemonData.name}</span>
                <span className="details-id">{id}</span>
              </div>

              <div className="details-img">
                <img
                  src={img}
                  alt={pokemonData.name}
                  className="detail-image"
                />
              </div>
            </div>
            <div className="details-card">
              <div className="details-types">
                {pokemonData.types.map((type, index) => (
                  <div
                    key={index}
                    className="details-type"
                    style={{ background: colorsArray[index].primary }}
                  >
                    <span className="details-type-name">{type.type.name}</span>
                  </div>
                ))}
              </div>

              <div
                className="details-about"
                style={{ color: colorsArray[0].primary }}
              >
                About
              </div>

              <div className="details-attributes">
                <div className="details-attr-section">
                  <div className="details-attr">
                    <img src="../assets/img/weight.svg" alt="weight" />
                    <span className="details-attr-data">
                      {pokemonData.weight / 10}
                      {' kg'}
                    </span>
                  </div>
                  <span className="details-attr-text">Weight</span>
                </div>
                <span className="divider" />
                <div className="details-attr-section">
                  <div className="details-attr">
                    <img src="../assets/img/straighten.svg" alt="height" />
                    <span className="details-attr-data">
                      {pokemonData.height / 10}
                      {' kg'}
                    </span>
                  </div>
                  <span className="details-attr-text">Height</span>
                </div>
                <span className="divider" />
                <div className="details-attr-section">
                  <div className="details-attr-moves">
                    {pokemonData.moves.slice(0, 2).map((move, index) => (
                      <span key={index} className="details-attr-moves-text">
                        {move.move.name}
                      </span>
                    ))}
                  </div>
                  <span className="details-attr-text">Moves</span>
                </div>
              </div>

              <div
                className="details-about"
                style={{ color: colorsArray[0].primary }}
              >
                Base Stats
              </div>

              <div className="details-stats">
                <div
                  className="details-stats-label-section"
                  style={{ color: colorsArray[0]?.primary || '#ccc' }}
                >
                  <span className="details-stats-label-name">HP</span>
                  <span className="details-stats-label-name">ATK</span>
                  <span className="details-stats-label-name">DEF</span>
                  <span className="details-stats-label-name">SATK</span>
                  <span className="details-stats-label-name">SDEF</span>
                  <span className="details-stats-label-name">SPD</span>
                </div>
                <div className="stats-divider"></div>
                <div className="data-list">
                  {pokemonData.stats.map((stat, index) => (
                    <div key={index} className="stat-item">
                      <div className="stat-value">{stat.base_stat}</div>
                      <div
                        style={{
                          width: '100%',
                          height: '4px',
                          backgroundColor: `${colorsArray[0]?.secondary || '#eee'}`,
                          borderRadius: '4px',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            width: `${(stat.base_stat / 250) * 100}%`,
                            height: '100%',
                            backgroundColor: `${colorsArray[0]?.primary || '#ccc'}`,
                            transition: 'width 0.5s ease',
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default CardDetails;
