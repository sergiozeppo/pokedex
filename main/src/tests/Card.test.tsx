import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, test, vi, type Mock } from 'vitest';
import Card from '../components/Card/Card';
import { fetchPokemonDetails } from '../services/api';

const mockPokemonData = {
  id: 25,
  name: 'pikachu',
  abilities: [
    { ability: { name: 'static' } },
    { ability: { name: 'lightning-rod' } },
  ],
  sprites: {
    front_default: 'pikachu.png',
    other: {
      dream_world: { front_default: null },
      'official-artwork': { front_default: null },
    },
  },
};

vi.mock('../services/api', () => ({
  fetchPokemonDetails: vi.fn(),
}));

describe('Card Component', () => {
  beforeEach(() => {
    (fetchPokemonDetails as Mock).mockReset();
  });

  test('shows loader while loading', async () => {
    (fetchPokemonDetails as Mock).mockResolvedValue(mockPokemonData);

    render(
      <MemoryRouter>
        <Card name="pikachu" />
      </MemoryRouter>
    );

    expect(screen.getByText('#000')).toBeInTheDocument();
    await waitFor(() => expect(fetchPokemonDetails).toHaveBeenCalled());
  });

  test('displays pokemon data after loading', async () => {
    (fetchPokemonDetails as Mock).mockResolvedValue(mockPokemonData);

    render(
      <MemoryRouter>
        <Card name="pikachu" />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('#025')).toBeInTheDocument();
      expect(screen.getByAltText('pikachu')).toHaveAttribute(
        'src',
        'pikachu.png'
      );
      expect(
        screen.getByText('Abilities: static, lightning-rod')
      ).toBeInTheDocument();
    });
  });

  test('shows error message when fetch fails', async () => {
    (fetchPokemonDetails as Mock).mockRejectedValue(new Error('API error'));

    render(
      <MemoryRouter>
        <Card name="invalid" />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText('Failed to load Pokémon details')
      ).toBeInTheDocument();
    });
  });

  test('links to correct pokemon page', async () => {
    (fetchPokemonDetails as Mock).mockResolvedValue(mockPokemonData);

    render(
      <MemoryRouter>
        <Card name="pikachu" />
      </MemoryRouter>
    );

    await waitFor(() => {
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/pokemon/pikachu');
    });
  });
});
