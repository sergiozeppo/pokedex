// components/Flyout.tsx
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { clearSelectedPokemons } from '../../store/reducers/selectedPokemonsSlice';
import './Modal.css';

const Modal = () => {
  const dispatch = useDispatch();
  const selectedPokemons = useSelector(
    (state: RootState) => state.selectedPokemonsSlice
  );

  if (selectedPokemons.length === 0) return null;

  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="modal-img-cont">
          <img src="../assets/img/select.gif" alt="" />
        </div>
        <p>
          {selectedPokemons.length}{' '}
          {selectedPokemons.length === 1 ? `pokémon ` : `pokémons `}
          selected
        </p>
        {selectedPokemons.length <= 3 ? (
          <>
            {selectedPokemons.length === 1 ? (
              <p>Here he is:</p>
            ) : (
              <p>Here they are:</p>
            )}
            {[...selectedPokemons].reverse().map((pokemon, idx) => (
              <h3 key={idx}>{pokemon}</h3>
            ))}
          </>
        ) : (
          <>
            <p>Here are the last three:</p>
            {[...selectedPokemons]
              .slice(-3)
              .reverse()
              .map((pokemon, idx) => (
                <h3 key={idx}>{pokemon}</h3>
              ))}
          </>
        )}
        <div className="modal-buttons">
          <button
            onClick={() => dispatch(clearSelectedPokemons())}
            className="modal-button"
          >
            Unselect all
          </button>
          <button className="modal-button">Download</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
