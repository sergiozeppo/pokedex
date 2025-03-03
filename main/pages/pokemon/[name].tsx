import styles from '../../src/views/CardDetails/CardDetails.module.css';
import { PokemonColorPair } from '../../src/types/types';
import PokeLoader from '../../src/components/PokeLoader/PokeLoader';
import { usePokemonBackground } from '../../src/utils/usePokemonBackground/usePokemonBackground';
import { useGetPokemonOutletDetailsQuery } from '../../src/services/api';
import { useRouter } from 'next/router';
import RootLayout from '../RootLayout';
import PokemonLayout from './PokemonLayout';

const CardDetails = () => {
  const router = useRouter();
  const name = router.query.name as string;

  const {
    data: pokemonData,
    isLoading,
    isError,
    error,
  } = useGetPokemonOutletDetailsQuery(name || '');

  const handleClick = () => router.push('/');

  const colorsArray = usePokemonBackground(
    pokemonData?.types || []
  ) as PokemonColorPair[];

  if (!name)
    return <div className={styles['card-details']}>No Pokémon selected</div>;

  const id = `#${pokemonData?.id?.toString().padStart(3, '0')}`;
  const img = pokemonData?.imageUrl || '/assets/img/poke-loader.png';

  console.log(router.query);

  return (
    <RootLayout>
      <PokemonLayout>
        <div
          className={styles['card-details']}
          style={{
            background: colorsArray[0]?.primary || '#ccc',
          }}
        >
          {isLoading ? (
            <PokeLoader data-testid="poke-loader" />
          ) : isError ? (
            <div className={styles['error']}>
              {(error as Error)?.message || 'Failed to load Pokémon details'}
            </div>
          ) : pokemonData ? (
            <>
              <div className={styles['details-container']}>
                <div className={styles['details-header']}>
                  <div className={styles['details-title']}>
                    <div
                      className={styles['details-close']}
                      onClick={handleClick}
                    ></div>
                    <span className={styles['details-h2']}>
                      {pokemonData.name}
                    </span>
                    <span className={styles['details-id']}>{id}</span>
                  </div>

                  <div className={styles['details-img']}>
                    <img
                      src={img}
                      alt={pokemonData.name}
                      className={styles['detail-image']}
                    />
                  </div>
                </div>

                <div className={styles['details-card']}>
                  <div className={styles['details-types']}>
                    {pokemonData.types.map((type, index) => (
                      <div
                        key={index}
                        className={styles['details-type']}
                        style={{ background: colorsArray[index].primary }}
                      >
                        <span
                          className={styles['details-type-name']}
                          data-testid="pokemon-type"
                        >
                          {type.type.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div
                    className={styles['details-about']}
                    style={{
                      color: colorsArray[0].primary,
                    }}
                  >
                    About
                  </div>

                  <div className={styles['details-attributes']}>
                    <div className={styles['details-attr-section']}>
                      <div className={styles['details-attr']}>
                        <img
                          className={styles['details-img-weight']}
                          src="/assets/img/weight.svg"
                          alt="weight"
                        />
                        <span className={styles['details-attr-data']}>
                          {pokemonData.weight / 10} kg
                        </span>
                      </div>
                      <span className={styles['details-attr-text']}>
                        Weight
                      </span>
                    </div>

                    <span className={styles['divider']} />

                    <div className={styles['details-attr-section']}>
                      <div className={styles['details-attr']}>
                        <img
                          className={styles['details-img-height']}
                          src="/assets/img/straighten.svg"
                          alt="height"
                        />
                        <span className={styles['details-attr-data']}>
                          {pokemonData.height / 10} m
                        </span>
                      </div>
                      <span className={styles['details-attr-text']}>
                        Height
                      </span>
                    </div>

                    <span className={styles['divider']} />

                    <div className={styles['details-attr-section']}>
                      <div className={styles['details-attr-moves']}>
                        {pokemonData.moves.slice(0, 2).map((move, index) => (
                          <span
                            key={index}
                            className={styles['details-attr-moves-text']}
                          >
                            {move.move.name}
                          </span>
                        ))}
                      </div>
                      <span className={styles['details-attr-text']}>Moves</span>
                    </div>
                  </div>

                  <div
                    className={styles['details-about']}
                    style={{
                      color: colorsArray[0].primary,
                    }}
                  >
                    Base Stats
                  </div>

                  <div className={styles['details-stats']}>
                    <div
                      className={styles['details-stats-label-section']}
                      style={{
                        color: colorsArray[0]?.primary || '#ccc',
                      }}
                    >
                      {['HP', 'ATK', 'DEF', 'SATK', 'SDEF', 'SPD'].map(
                        (label) => (
                          <span
                            key={label}
                            className={styles['details-stats-label-name']}
                          >
                            {label}
                          </span>
                        )
                      )}
                    </div>

                    <div className={styles['stats-divider']}></div>

                    <div className={styles['data-list']}>
                      {pokemonData.stats.map((stat, index) => (
                        <div key={index} className={styles['stat-item']}>
                          <div className={styles['stat-value']}>
                            {stat.base_stat}
                          </div>
                          <div
                            style={{
                              width: '100%',
                              height: '4px',
                              backgroundColor:
                                colorsArray[0]?.secondary || '#eee',
                              borderRadius: '4px',
                              overflow: 'hidden',
                            }}
                          >
                            <div
                              style={{
                                width: `${(stat.base_stat / 250) * 100}%`,
                                height: '100%',
                                backgroundColor:
                                  colorsArray[0]?.primary || '#ccc',
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
      </PokemonLayout>
    </RootLayout>
  );
};

export default CardDetails;
