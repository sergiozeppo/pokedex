import SearchBar from '../../components/SearchBar/SearchBar';
import Logo from '../../components/Logo/Logo';
import './Header.css';

interface HeaderProps {
  onSearch: (searchData: string) => void;
  searchQuery: string;
  onInputChange: (searchQuery: string) => void;
}

function Header({ onSearch, searchQuery, onInputChange }: HeaderProps) {
  return (
    <header>
      <div className="title">
        <Logo />
        <span>Pokédex</span>
      </div>
      <SearchBar
        className="search-input"
        type="text"
        placeholder="Search"
        onSearch={onSearch}
        searchQuery={searchQuery}
        onInputChange={onInputChange}
      />
    </header>
  );
}

export default Header;
