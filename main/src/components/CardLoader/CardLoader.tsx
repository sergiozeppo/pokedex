import '../Card/Card.css';
import './CardLoader.css';
import pokeLoader from '/assets/img/poke-loader.png';

function CardLoader() {
  const imageUrl = pokeLoader;

  return (
    <div className="card card-loader">
      <span className="card-number">#000</span>
      <img className="card-img" src={imageUrl} alt="" />
      <div className="card-title">
        <h3>Pokémon Name</h3>
        <p>Abilities: Some abilities</p>
      </div>
    </div>
  );
}

export default CardLoader;
