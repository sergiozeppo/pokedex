import SearchBar from '../../components/SearchBar/SearchBar';
import Logo from '../../components/Logo/Logo';
import './Header.module.css';

function Header() {
  return (
    <header>
      <div className="title">
        <Logo />
        <span>Pokédex</span>
      </div>
      <SearchBar />
    </header>
  );
}

export default Header;
