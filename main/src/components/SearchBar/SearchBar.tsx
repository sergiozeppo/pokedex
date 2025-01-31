import { Component, ChangeEvent, KeyboardEvent } from 'react';
import { SearchBarProps } from '../../types/types';
import './SearchBar.css';
import Button from '../Button/Button';

interface ErrorState {
  hasError: boolean;
}

class SearchBar extends Component<SearchBarProps, ErrorState> {
  state: ErrorState = {
    hasError: false,
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.onInputChange(event.target.value);
  };

  handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.props.onSearch(this.props.searchQuery);
    }
  };

  handleSearchClick = () => {
    this.props.onSearch(this.props.searchQuery);
  };

  handleClick = () => {
    this.setState({ hasError: true });
  };

  render() {
    const { hasError } = this.state;

    if (hasError) {
      throw new Error('Custom error for test ErrorBoundary');
    }

    return (
      <div className="search-bar">
        <input
          className="search-input"
          value={this.props.searchQuery}
          type="text"
          placeholder="Search"
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
        />
        <Button
          className="button"
          title="Search"
          onClick={this.handleSearchClick}
        >
          Search
        </Button>
        <button className="error-button" onClick={this.handleClick}>
          Click me
        </button>
      </div>
    );
  }
}
export default SearchBar;
