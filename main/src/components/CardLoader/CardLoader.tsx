import styles from '../Card/Card.module.css';
import cardStyles from './CardLoader.module.css';

function CardLoader() {
  return (
    <div className={styles.card + '' + cardStyles['card-loader']}>
      <span className={styles['card-number']}>#000</span>
      <img
        className={styles['card-img']}
        src="/assets/img/poke-loader.png"
        alt="loader"
      />
      <div className={styles['card-title']}>
        <h3>Pokémon Name</h3>
        <p>Abilities: Some abilities</p>
      </div>
    </div>
  );
}

export default CardLoader;
