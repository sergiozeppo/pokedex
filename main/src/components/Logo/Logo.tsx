import { Component, ReactNode } from 'react';
import logo from '/assets/img/logo.svg';
import './Logo.css';

class Logo extends Component {
  render(): ReactNode {
    return <img src={logo} alt="Pokedex Logo" className="logo" />;
  }
}

export default Logo;
