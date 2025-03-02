import styles from './PokeLoader.module.css';

export default function PokeLoader() {
  return (
    <div
      className={styles['pokeball-loader-container']}
      data-testid="poke-loader"
    >
      <div className={styles['pokeball-loader']}></div>
    </div>
  );
}
