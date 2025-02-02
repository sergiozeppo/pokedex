import { Component, ReactNode } from 'react';
import CardList from '../../components/CardList/CardList';
import './Main.css';
import { Pokemon } from '../../types/types';

type MainProps = {
  pokemons: Pokemon[];
  isFetching: boolean;
};

class Main extends Component<MainProps> {
  render(): ReactNode {
    const { pokemons, isFetching } = this.props;

    return (
      <main>
        <CardList pokemons={pokemons} isFetching={isFetching} />
      </main>
    );
  }
}

export default Main;
