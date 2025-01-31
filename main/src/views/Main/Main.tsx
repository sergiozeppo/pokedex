import { Component, ReactNode } from 'react';
import CardList from '../../components/CardList/CardList';
import './Main.css';
import { Pokemon } from '../../types/types';

type MainProps = {
  pokemons: Pokemon[];
  isFetching: boolean;
};

interface MainState {
  hasError: boolean;
}

class Main extends Component<MainProps, MainState> {
  state: MainState = {
    hasError: false,
  };

  handleClick = () => {
    this.setState({ hasError: true });
  };

  render(): ReactNode {
    const { pokemons, isFetching } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      throw new Error('Custom error for test ErrorBoundary');
    }

    return (
      <main>
        <CardList pokemons={pokemons} isFetching={isFetching} />
        <button className="error-button" onClick={this.handleClick}>
          Click me
        </button>
      </main>
    );
  }
}

export default Main;
