import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { MemoryRouter, useParams } from 'react-router';
import { usePokemonBackground } from '../utils/usePokemonBackground/usePokemonBackground';
import { fetchPokemonDetails } from '../services/api';
import { PokemonData } from '../types/types';
import CardDetails from '../views/CardDetails/CardDetails';

vi.mock('../services/api');
vi.mock('../utils/usePokemonBackground/usePokemonBackground');
vi.mock('react-router', async () => ({
  ...(await vi.importActual('react-router')),
  useParams: vi.fn(),
  useNavigate: vi.fn(),
}));

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
    vi.mocked(fetchPokemonDetails).mockResolvedValue(mockPokemonData);
    vi.mocked(usePokemonBackground).mockReturnValue([
      { primary: '#FFD700', secondary: '#EEE8AA' },
    ]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders loading state', async () => {
    vi.mocked(fetchPokemonDetails).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(mockPokemonData), 100)
        )
    );

    render(
      <MemoryRouter initialEntries={['/pokemon/pikachu']}>
        <CardDetails />
      </MemoryRouter>
    );

    expect(screen.getAllByRole('generic')).toBeTruthy();
    await waitFor(() => expect(fetchPokemonDetails).toHaveBeenCalled());
  });

  test('renders error state', async () => {
    vi.mocked(fetchPokemonDetails).mockRejectedValue(new Error('API Error'));

    render(
      <MemoryRouter initialEntries={['/pokemon/pikachu']}>
        <CardDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText('Failed to load Pokémon details')
      ).toBeInTheDocument();
    });
  });

  test('renders pokemon details correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/pokemon/pikachu']}>
        <CardDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('#025')).toBeInTheDocument();
      expect(screen.getByAltText('pikachu')).toHaveAttribute(
        'src',
        'pikachu.png'
      );
      expect(screen.getByText('electric')).toBeInTheDocument();
      expect(screen.getByText('thunder-shock')).toBeInTheDocument();
      expect(screen.getByText('quick-attack')).toBeInTheDocument();
    });
  });

  test('handles missing name parameter', () => {
    vi.mocked(useParams).mockReturnValue({ name: undefined });

    render(
      <MemoryRouter>
        <CardDetails />
      </MemoryRouter>
    );

    expect(screen.getByText('No Pokémon selected')).toBeInTheDocument();
  });
});
