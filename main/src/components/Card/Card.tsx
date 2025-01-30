import { Component, ReactNode } from 'react';
import { fetchPokemonDetails } from '../../services/api';
import './Card.css';
import { PokemonData } from '../../types/types';
import CardLoader from '../CardLoader/CardLoader';

export type CardProps = {
  name: string;
};

interface CardState {
  id: number;
  imageUrl: string;
  abilities: string[];
  isLoading: boolean;
  error: string | null;
}

class Card extends Component<CardProps, CardState> {
  state: CardState = {
    id: 0,
    imageUrl: '',
    abilities: [],
    isLoading: true,
    error: null,
  };

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });
      const pokemonData: PokemonData = await fetchPokemonDetails(
        this.props.name
      );
      this.setState({
        id: pokemonData.id,
        imageUrl:
          pokemonData.sprites.other.dream_world.front_default ||
          pokemonData.sprites.other['official-artwork'].front_default ||
          pokemonData.sprites.front_default,
        abilities: pokemonData.abilities.map((ability) => ability.ability.name),
      });
    } catch {
      this.setState({
        error: 'Failed to load Pokémon details',
      });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render(): ReactNode {
    const { name } = this.props;
    const { id, imageUrl, abilities, isLoading, error } = this.state;
    const formattedId = `#${id.toString().padStart(3, '0')}`;

    return (
      <div className="card">
        {isLoading ? (
          <CardLoader />
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <span className="card-number">{formattedId}</span>
            <img className="card-img" src={imageUrl} alt={name} />
            <div className="card-title">
              <h3>{name}</h3>
              <p>Abilities: {abilities.join(', ')}</p>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Card;
