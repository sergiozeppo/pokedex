import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { SearchBarProps } from '../../types/types';
import './SearchBar.css';
import Button from '../Button/Button';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';

function SearchBar({ onSearch, searchQuery, onInputChange }: SearchBarProps) {
  const [hasError, setHasError] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onInputChange(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(searchQuery);
    }
  };

  const handleSearchClick = () => {
    onSearch(searchQuery);
  };

  const handleClick = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('Custom error for test ErrorBoundary');
  }

  return (
    <div className="search-bar">
      <input
        className="search-input"
        value={searchQuery}
        type="text"
        placeholder="Search"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <Button className="button" title="Search" onClick={handleSearchClick}>
        Search
      </Button>
      <ThemeSwitcher />
      <button className="error-button" onClick={handleClick}>
        ERROR!
      </button>
    </div>
  );
}

export default SearchBar;
