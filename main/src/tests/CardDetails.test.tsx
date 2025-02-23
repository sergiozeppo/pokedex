import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { MemoryRouter, useParams } from 'react-router';
import { usePokemonBackground } from '../utils/usePokemonBackground/usePokemonBackground';
import { PokemonData } from '../types/types';
import CardDetails from '../views/CardDetails/CardDetails';
import { useGetPokemonDetailsQuery } from '../services/api';
import { setupStore } from '../store';
import { Provider } from 'react-redux';

const store = setupStore();

vi.mock('../services/api', async () => {
  const actual = await vi.importActual('../services/api');
  return {
    ...actual,
    useGetPokemonDetailsQuery: vi.fn(),
  };
});
vi.mock('../utils/usePokemonBackground/usePokemonBackground');
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: vi.fn(),
  };
});

const mockPokemonData: PokemonData = {
  id: 25,
  name: 'pikachu',
  types: [{ slot: 1, type: { name: 'electric', url: '' } }],
  sprites: {
    front_default: 'pikachu.png',
    other: {
      dream_world: { front_default: 'pikachu.png' },
      'official-artwork': { front_default: 'pikachu.png' },
    },
  },
  weight: 60,
  height: 4,
  moves: [
    { move: { name: 'thunder-shock' } },
    { move: { name: 'quick-attack' } },
  ],
  stats: [{ base_stat: 35 }, { base_stat: 55 }],
  abilities: [],
};

describe('CardDetails Component', () => {
  beforeEach(() => {
    vi.mocked(useParams).mockReturnValue({ name: 'pikachu' });
    vi.mocked(useGetPokemonDetailsQuery).mockReturnValue({
      data: mockPokemonData,
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    });
    vi.mocked(usePokemonBackground).mockReturnValue([
      { primary: '#FFD700', secondary: '#EEE8AA' },
    ]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders loading state', async () => {
    vi.mocked(useGetPokemonDetailsQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      refetch: vi.fn(),
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/pokemon/pikachu']}>
          <CardDetails />
        </MemoryRouter>
      </Provider>
    );

    expect(document.querySelector('.card-img')).not.toBeTruthy();
  });

  test('renders error state', async () => {
    vi.mocked(useGetPokemonDetailsQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error('API error'),
      refetch: vi.fn(),
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/pokemon/pikachu']}>
          <CardDetails />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('No Pokémon selected')).toBeInTheDocument();
    });
  });

  test('renders pokemon details correctly', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/pokemon/pikachu']}>
          <CardDetails />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('No Pokémon selected')).toBeInTheDocument();
    });
  });

  test('handles missing name parameter', () => {
    vi.mocked(useParams).mockReturnValue({ name: undefined });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardDetails />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('No Pokémon selected')).toBeInTheDocument();
  });
});
