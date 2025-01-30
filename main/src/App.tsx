import { Component, ReactNode } from 'react';
import Header from './views/Header/Header';
import { fetchData } from './services/api';
import './App.css';
import Main from './views/Main/Main';
import { Pokemon } from './types/types';

interface AppState {
  pokemons: Pokemon[];
  error: Error | null;
  isFetching: boolean;
}

class App extends Component<AppState> {
  state: AppState = {
    pokemons: [],
    error: null,
    isFetching: true,
  };
  handleFetchData = async () => {
    try {
      this.setState({ isFetching: true });
      const pokemons = await fetchData();
      this.setState({
        pokemons,
        error: null,
      });
    } catch (error) {
      this.setState({
        pokemons: [],
        error: error instanceof Error ? error : new Error('Unknown error'),
      });
    } finally {
      this.setState({
        isFetching: false,
      });
    }
  };

  componentDidMount() {
    this.handleFetchData();
  }

  render(): ReactNode {
    const { pokemons, isFetching, error } = this.state;
    return (
      <div className="container">
        <Header />
        {isFetching ? (
          <div className="pokeball-loader"></div>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <Main pokemons={pokemons} />
        )}
      </div>
    );
  }
}

export default App;
