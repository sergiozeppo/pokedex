import { useParams, useNavigate } from 'react-router-dom';
import './CardDetails.css';
import { PokemonColorPair } from '../../types/types';
import PokeLoader from '../../components/PokeLoader/PokeLoader';
import { usePokemonBackground } from '../../utils/usePokemonBackground/usePokemonBackground';
import { useGetPokemonOutletDetailsQuery } from '../../services/api';

const CardDetails = () => {
  const { name } = useParams<{ name: string }>();
  const {
    data: pokemonData,
    isLoading,
    isError,
    error,
  } = useGetPokemonOutletDetailsQuery(name || '');
  const navigate = useNavigate();

  const handleClick = () => navigate('/');
  const colorsArray = usePokemonBackground(
    pokemonData?.types || []
  ) as PokemonColorPair[];

  if (!name) return <div className="card-details">No Pokémon selected</div>;

  const id = `#${pokemonData?.id.toString().padStart(3, '0')}`;
  const img = pokemonData?.imageUrl || '../assets/img/poke-loader.png';

  return (
    <div
      className="card-details"
      style={{ background: colorsArray[0]?.primary || '#ccc' }}
    >
      {isLoading ? (
        <PokeLoader />
      ) : isError ? (
        <div className="error">
          {(error as Error)?.message || 'Failed to load Pokémon details'}
        </div>
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
                    <img
                      className="details-img-weight"
                      src="../assets/img/weight.svg"
                      alt="weight"
                    />
                    <span className="details-attr-data">
                      {pokemonData.weight / 10} kg
                    </span>
                  </div>
                  <span className="details-attr-text">Weight</span>
                </div>

                <span className="divider" />

                <div className="details-attr-section">
                  <div className="details-attr">
                    <img
                      className="details-img-height"
                      src="../assets/img/straighten.svg"
                      alt="height"
                    />
                    <span className="details-attr-data">
                      {pokemonData.height / 10} m
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
                  {['HP', 'ATK', 'DEF', 'SATK', 'SDEF', 'SPD'].map((label) => (
                    <span key={label} className="details-stats-label-name">
                      {label}
                    </span>
                  ))}
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
                          backgroundColor: colorsArray[0]?.secondary || '#eee',
                          borderRadius: '4px',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            width: `${(stat.base_stat / 250) * 100}%`,
                            height: '100%',
                            backgroundColor: colorsArray[0]?.primary || '#ccc',
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
