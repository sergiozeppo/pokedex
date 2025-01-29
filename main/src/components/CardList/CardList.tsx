import { Component, ReactNode } from 'react';
import './CardList.css';
import { Pokemon } from '../../types/types';
import Card from '../Card/Card';

interface CardListProps {
  pokemons: Pokemon[];
}

class CardList extends Component<CardListProps> {
  render(): ReactNode {
    const { pokemons } = this.props;

    return (
      <div className="card-list">
        {pokemons.length ? (
          pokemons.map((pokemon, index) => (
            <Card key={index} name={pokemon.name} />
          ))
        ) : (
          <p>No Pokémon available.</p>
        )}
      </div>
    );
  }
}

export default CardList;
