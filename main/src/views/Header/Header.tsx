import { Component, ReactNode } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import Logo from '../../components/Logo/Logo';
import './Header.css';

class Header extends Component {
  render(): ReactNode {
    return (
      <header>
        <div className="title">
          <Logo />
          <span>Pokédex</span>
        </div>
        <SearchBar
          className="search-input"
          value={''}
          type={'text'}
          placeholder={'Search'}
          onChange={(e) => console.log(e.target.value)}
        />
      </header>
    );
  }
}

export default Header;
