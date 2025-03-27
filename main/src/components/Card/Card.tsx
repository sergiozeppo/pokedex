import { Link } from 'react-router-dom';
import './Card.css';
import CardLoader from '../CardLoader/CardLoader';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPokemon,
  unselectPokemon,
} from '../../store/reducers/selectedPokemonsSlice';
import { RootState } from '../../store';
import { useGetPokemonDetailsQuery } from '../../services/api';

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
    <div className="card">
      {isLoading ? (
        <CardLoader />
      ) : isError ? (
        <p>Failed to load Pokémon details</p>
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
                  checked={selectedPokemons.some(
                    (poke) => poke.id === details.id
                  )}
                  onChange={handleCheckboxChange}
                  onClick={(e) => e.stopPropagation()}
                />
                <span></span>
              </label>
              <span className="card-number">{formattedId}</span>
            </div>

            <img className="card-img" src={details.imageUrl} alt={name} />
            <div className="card-title">
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
