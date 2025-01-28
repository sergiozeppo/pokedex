import { Component, ChangeEvent } from 'react';
import { SearchBarProps } from '../../types/types';

class SearchBar extends Component<SearchBarProps> {
  handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(event);
  };

  render() {
    return (
      <input
        className={this.props.className}
        value={this.props.value}
        type={this.props.type}
        placeholder={this.props.placeholder}
        onChange={this.handleChangeEvent}
      />
    );
  }
}
export default SearchBar;
