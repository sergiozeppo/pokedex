import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import Card from '../components/Card/Card';
import { Provider } from 'react-redux';
import { useGetPokemonDetailsQuery } from '../services/api';
import { setupStore } from '../store';

vi.mock('../services/api', async (importOriginal) => {
  const mod = (await importOriginal()) as object;
  return {
    ...mod,
    useGetPokemonDetailsQuery: vi.fn(),
  };
});

const mockPokemonDetails = {
  id: 25,
  name: 'pikachu',
  abilities: ['static', 'lightning-rod'],
  imageUrl: 'pikachu.png',
  types: [{ type: { name: 'electric' } }],
  stats: [],
  moves: [],
  height: 4,
  weight: 60,
  sprites: {
    other: {
      dream_world: { front_default: 'pikachu.png' },
      'official-artwork': { front_default: 'pikachu.png' },
    },
    front_default: 'pikachu.png',
  },
};

const store = setupStore();

describe('Card Component', () => {
  const mockUseGetPokemonDetailsQuery = vi.mocked(useGetPokemonDetailsQuery);

  beforeEach(() => {
    mockUseGetPokemonDetailsQuery.mockReset();
  });

  test('displays pokemon data after loading', async () => {
    mockUseGetPokemonDetailsQuery.mockReturnValue({
      data: mockPokemonDetails,
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card name="pikachu" />
        </MemoryRouter>
      </Provider>
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

  test('links to correct pokemon page', async () => {
    mockUseGetPokemonDetailsQuery.mockReturnValue({
      data: mockPokemonDetails,
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card name="pikachu" />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/pokemon/pikachu');
    });
  });
});
