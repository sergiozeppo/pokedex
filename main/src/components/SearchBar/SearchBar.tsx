import { Component, ChangeEvent } from 'react';
import { SearchBarProps } from '../../types/types';
import './SearchBar.css';
import Button from '../Button/Button';

class SearchBar extends Component<SearchBarProps> {
  handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(event);
  };

  render() {
    return (
      <div className="search-bar">
        <input
          className={this.props.className}
          value={this.props.value}
          type={this.props.type}
          placeholder={this.props.placeholder}
          onChange={this.handleChangeEvent}
        />
        <Button
          className=""
          title="Search"
          onClick={() => console.log('Click')}
        >
          Search
        </Button>
      </div>
    );
  }
}
export default SearchBar;
