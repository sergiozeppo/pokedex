import { Component, ReactNode } from 'react';
import Header from './views/Header/Header';
import { fetchData, fetchSearchData } from './services/api';
import './App.css';
import Main from './views/Main/Main';
import { Pokemon } from './types/types';

interface AppState {
  pokemons: Pokemon[];
  error: Error | null;
  isFetching: boolean;
  searchQuery: string;
}

class App extends Component<AppState> {
  state: AppState = {
    searchQuery: '',
    pokemons: [],
    isFetching: false,
    error: null,
  };

  componentDidMount() {
    const prevSearch = localStorage.getItem('searchPokemon');
    if (prevSearch) {
      this.handleSearchData(prevSearch);
    } else {
      this.handleFetchData();
    }
  }

  handleFetchData = async () => {
    try {
      this.setState({ isFetching: true });
      const pokemons = await fetchData();
      this.setState({
        pokemons: pokemons || [],
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

  handleSearchData = async (searchData: string) => {
    this.setState({ isFetching: true, searchQuery: searchData.trim() });

    fetchSearchData(searchData.trim())
      .then((pokemons) => {
        this.setState({
          pokemons: pokemons || [],
          error: null,
        });
        localStorage.setItem('searchPokemon', searchData.trim());
      })
      .catch((error) => {
        this.setState({
          pokemons: [],
          error: error instanceof Error ? error : new Error('Unknown error'),
        });
      })
      .finally(() => {
        this.setState({ isFetching: false });
      });
  };

  handleInputChange = (searchQuery: string) => {
    this.setState({ searchQuery });
  };

  render(): ReactNode {
    const { pokemons, isFetching, error, searchQuery } = this.state;
    console.log('App render:', { pokemons, isFetching, error });
    return (
      <div className="container">
        <Header
          onSearch={this.handleSearchData}
          searchQuery={searchQuery}
          onInputChange={this.handleInputChange}
        />
        {isFetching ? (
          <div className="pokeball-loader"></div>
        ) : error ? (
          <div className="broken">
            <img
              className="broken-pokeball"
              src="/assets/img/broken-pokeball.png"
              alt=""
            />
            <span>Error: {error.message}</span>
          </div>
        ) : (
          <Main pokemons={pokemons} isFetching={this.state.isFetching} />
        )}
      </div>
    );
  }
}

export default App;
