'use client';

import { ChangeEvent, KeyboardEvent, useState } from 'react';
import Button from '../Button/Button';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import { useDispatch } from 'react-redux';
import { useSearchQuery } from '../../utils/useSearchQuery/useSearchQuery';
import { setSearchQuery } from '../../store/reducers/searchQuerySlice';
import styles from './SearchBar.module.css';

function SearchBar() {
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { updateSearchQuery } = useSearchQuery();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(setSearchQuery(inputValue.trim()));
      updateSearchQuery(inputValue.trim());
    }
  };

  const handleSearchClick = () => {
    dispatch(setSearchQuery(inputValue.trim()));
    updateSearchQuery(inputValue.trim());
  };

  const handleErrorClick = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('Custom error for test ErrorBoundary');
  }

  return (
    <div className={styles['search-bar']}>
      <input
        className={styles['search-input']}
        type="text"
        placeholder="Search"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <Button
        className={styles.button}
        title="Search"
        onClick={handleSearchClick}
      >
        Search
      </Button>
      <ThemeSwitcher />
      <button className={styles['error-button']} onClick={handleErrorClick}>
        ERROR!
      </button>
    </div>
  );
}

export default SearchBar;
