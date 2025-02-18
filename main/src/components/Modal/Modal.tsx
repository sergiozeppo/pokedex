// components/Flyout.tsx
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { clearSelectedPokemons } from '../../store/reducers/selectedPokemonsSlice';
import './Modal.css';
import { useEffect, useRef, useState } from 'react';

const Modal = () => {
  const dispatch = useDispatch();
  const selectedPokemons = useSelector(
    (state: RootState) => state.selectedPokemonsSlice
  );
  const downloadWithoutDOMRef = useRef<HTMLAnchorElement>(null);
  const [csv, setCsv] = useState<string | null>(null);

  useEffect(() => {
    if (selectedPokemons.length === 0) return;

    const headers = ['ID', 'Name', 'Abilities', 'Image'];
    const csvRows = [
      headers.join(','),
      ...selectedPokemons.map((pokemon) =>
        [
          pokemon.id,
          pokemon.name,
          pokemon.abilities.join(' | '),
          pokemon.imageUrl,
        ]
          .map((value) => `"${value}"`)
          .join(',')
      ),
    ];

    setCsv(csvRows.join('\n'));
  }, [selectedPokemons]);

  const handleDownloadCsv = () => {
    if (!csv) return;

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const fileName = `${selectedPokemons.length}_pokemons.csv`;

    if (downloadWithoutDOMRef.current) {
      downloadWithoutDOMRef.current.href = url;
      downloadWithoutDOMRef.current.download = fileName;
      downloadWithoutDOMRef.current.click();
    }

    URL.revokeObjectURL(url);
  };

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
              <h3 key={idx}>{pokemon.name}</h3>
            ))}
          </>
        ) : (
          <>
            <p>Here are the last three:</p>
            {[...selectedPokemons]
              .slice(-3)
              .reverse()
              .map((pokemon, idx) => (
                <h3 key={idx}>{pokemon.name}</h3>
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
          <button className="modal-button" onClick={handleDownloadCsv}>
            Download
          </button>
          <a
            className="download-link-without-DOM"
            ref={downloadWithoutDOMRef}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
