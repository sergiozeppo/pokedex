import CardLoader from '../CardLoader/CardLoader';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPokemon,
  unselectPokemon,
} from '../../store/reducers/selectedPokemonsSlice';
import { RootState } from '../../store';
import { useGetPokemonDetailsQuery } from '../../services/api';
import Link from 'next/link';
import styles from './Card.module.css';

type CardProps = {
  name: string;
};

const Card = ({ name }: CardProps) => {
  const dispatch = useDispatch();
  const { data: details, isLoading, isError } = useGetPokemonDetailsQuery(name);
  const selectedPokemons = useSelector(
    (state: RootState) => state.selectedPokemonsSlice
  );

  const handleCheckboxChange = () => {
    if (!details) return;

    if (selectedPokemons.some((poke) => poke.id === details.id)) {
      dispatch(unselectPokemon(details.id));
    } else {
      dispatch(selectPokemon(details));
    }
  };

  if (!details) return null;

  const formattedId = `#${details.id.toString().padStart(3, '0')}`;

  return (
    <div className={styles.card}>
      {isLoading ? (
        <CardLoader />
      ) : isError ? (
        <p>Failed to load Pokémon details</p>
      ) : (
        <>
          <Link
            href={`/pokemon/${name}`}
            shallow
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles['checkbox-cont']}>
              <label
                className={styles['red-checkbox']}
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  className={styles['card-checkbox']}
                  type="checkbox"
                  checked={selectedPokemons.some(
                    (poke) => poke.id === details.id
                  )}
                  onChange={handleCheckboxChange}
                  onClick={(e) => e.stopPropagation()}
                />
                <span></span>
              </label>
              <span className={styles['card-number']}>{formattedId}</span>
            </div>

            <img
              className={styles['card-img']}
              src={details.imageUrl}
              alt={name}
            />
            <div className={styles['card-title']}>
              <h3>{name}</h3>
              <p>Abilities: {details.abilities.join(', ')}</p>
            </div>
          </Link>
        </>
      )}
    </div>
  );
};

export default Card;
