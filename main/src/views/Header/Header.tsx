import { Component, ReactNode } from 'react';
import Button from '../../components/Button/Button';
// import { ButtonProps, SearchBarProps } from '../../types/types';
import SearchBar from '../../components/SearchBar/SearchBar';

class Header extends Component {
  render(): ReactNode {
    return (
      <header>
        <SearchBar
          className="app"
          value={''}
          type={'text'}
          placeholder={'Zdrasti'}
          onChange={(e) => console.log(e.target.value)}
        />
        <Button
          className="app"
          title="Search"
          onClick={() => console.log('Click')}
        />
      </header>
    );
  }
}

export default Header;
