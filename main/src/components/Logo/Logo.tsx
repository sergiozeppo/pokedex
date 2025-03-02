// import logo from '/assets/img/logo.svg';
import styles from './Logo.module.css';

function Logo() {
  return (
    <img
      src="/assets/img/logo.svg"
      alt="Pokedex Logo"
      className={styles.logo}
    />
  );
}

export default Logo;
