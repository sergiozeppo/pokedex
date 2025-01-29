import { Component, ReactNode } from 'react';
import CardList from '../../components/CardList/CardList';
import './Main.css';
import { Pokemon } from '../../types/types';

type MainProps = {
  pokemons: Pokemon[];
};

class Main extends Component<MainProps> {
  render(): ReactNode {
    return (
      <main>
        <CardList pokemons={this.props.pokemons} />
      </main>
    );
  }
}

export default Main;
