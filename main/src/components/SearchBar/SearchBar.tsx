import { Component, ChangeEvent } from 'react';
import { SearchBarProps } from '../../types/types';
import './SearchBar.css';
import Button from '../Button/Button';

class SearchBar extends Component<SearchBarProps> {
  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.onInputChange(event.target.value);
  };

  handleSearchClick = () => {
    this.props.onSearch(this.props.searchQuery);
  };

  render() {
    return (
      <div className="search-bar">
        <input
          className="search-input"
          value={this.props.searchQuery}
          type="text"
          placeholder="Search"
          onChange={this.handleInputChange}
        />
        <Button
          className="button"
          title="Search"
          onClick={this.handleSearchClick}
        >
          Search
        </Button>
      </div>
    );
  }
}
export default SearchBar;
