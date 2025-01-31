import { Component, ReactNode } from 'react';
import Header from './views/Header/Header';
import { fetchData, fetchSearchData } from './services/api';
import './App.css';
import Main from './views/Main/Main';
import { Pokemon } from './types/types';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

interface AppState {
  pokemons: Pokemon[];
  allPokemons: Pokemon[];
  error: Error | null;
  isFetching: boolean;
  searchQuery: string;
}

class App extends Component<Record<string, never>, AppState> {
  state: AppState = {
    searchQuery: '',
    pokemons: [],
    allPokemons: [],
    isFetching: false,
    error: null,
  };

  componentDidMount() {
    this.handleFetchData().then(() => {
      const prevSearch = localStorage.getItem('searchPokemon');
      if (prevSearch) {
        this.setState({ searchQuery: prevSearch }, () => {
          this.handleSearchData(prevSearch);
        });
      }
    });
  }

  handleFetchData = async () => {
    this.setState({ isFetching: true, error: null });

    try {
      const allPokemons = await fetchData();
      this.setState({ allPokemons, pokemons: allPokemons });
    } catch (error) {
      this.setState({
        error: error instanceof Error ? error : new Error('Unknown error'),
      });
    } finally {
      this.setState({ isFetching: false });
    }
  };

  handleSearchData = async (searchData: string) => {
    this.setState({
      isFetching: true,
      searchQuery: searchData.trim(),
      error: null,
    });

    if (!searchData) {
      localStorage.removeItem('searchPokemon');
      this.handleFetchData();
      return;
    }

    try {
      const { allPokemons } = this.state;
      const pokemons = await fetchSearchData(searchData.trim(), allPokemons);
      this.setState({ pokemons });
      localStorage.setItem('searchPokemon', searchData.trim());
    } catch (error) {
      this.setState({
        error: error instanceof Error ? error : new Error('Unknown error'),
        pokemons: [],
      });
    } finally {
      this.setState({ isFetching: false });
    }
  };

  handleInputChange = (searchQuery: string) => {
    this.setState({ searchQuery });
  };

  render(): ReactNode {
    const { pokemons, isFetching, error, searchQuery } = this.state;

    return (
      <div className="container">
        <ErrorBoundary>
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
            <Main pokemons={pokemons} isFetching={isFetching} />
          )}
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
