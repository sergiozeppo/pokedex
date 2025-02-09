import { render, screen } from '@testing-library/react';

import Main from '../views/Main/Main';
import { MemoryRouter } from 'react-router';
import { describe, it, expect } from 'vitest';

const mockPokemons = [
  { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
  { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
];

describe('Main Component', () => {
  it('renders main container with CardList and Outlet', () => {
    render(
      <MemoryRouter>
        <Main pokemons={mockPokemons} isFetching={false} />
      </MemoryRouter>
    );

    const mainContainer = screen.getByRole('main');
    expect(mainContainer).toBeInTheDocument();
    expect(screen.getAllByText(/Pokémon Name/i)).toBeTruthy();
  });

  it('renders "No Pokémon available" when pokemons array is empty', () => {
    render(
      <MemoryRouter>
        <Main pokemons={[]} isFetching={false} />
      </MemoryRouter>
    );
    expect(screen.getByText(/No Pokémon available/i)).toBeInTheDocument();
  });
});
