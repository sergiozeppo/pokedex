import SearchBar from '../../components/SearchBar/SearchBar';
import Logo from '../../components/Logo/Logo';
import styles from './Header.module.css';

function Header() {
  return (
    <header>
      <div className={styles.title}>
        <Logo />
        <span>Pokédex</span>
      </div>
      <SearchBar />
    </header>
  );
}

export default Header;
