import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import CardDetails from '../../pages/pokemon/[name]';
import { MemoryRouter } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetPokemonOutletDetailsQuery } from '../services/api';
import { usePokemonBackground } from '../utils/usePokemonBackground/usePokemonBackground';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: vi.fn(),
  };
});

vi.mock('../services/api', async () => {
  const actual = await vi.importActual('../services/api');
  return {
    ...actual,
    useGetPokemonOutletDetailsQuery: vi.fn(),
  };
});

vi.mock('../utils/usePokemonBackground/usePokemonBackground', () => ({
  usePokemonBackground: vi.fn(),
}));

const mockedUseParams = vi.mocked(useParams, true);
const mockedUseNavigate = vi.mocked(useNavigate, true);
const mockedUseGetPokemonOutletDetailsQuery = vi.mocked(
  useGetPokemonOutletDetailsQuery,
  true
);
const mockedUsePokemonBackground = vi.mocked(usePokemonBackground, true);

const mockPokemonData = {
  id: 25,
  name: 'pikachu',
  imageUrl: 'pikachu.png',
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
    { move: { name: 'iron-tail' } },
  ],
  stats: [
    { base_stat: 35 },
    { base_stat: 55 },
    { base_stat: 40 },
    { base_stat: 50 },
    { base_stat: 50 },
    { base_stat: 90 },
  ],
  abilities: [
    { ability: { name: 'static', url: '' }, is_hidden: false, slot: 1 },
  ],
};

describe('CardDetails Component', () => {
  beforeEach(() => {
    mockedUseParams.mockReturnValue({ name: 'pikachu' });
    const navigateMock = vi.fn();
    mockedUseNavigate.mockReturnValue(navigateMock);
    mockedUseGetPokemonOutletDetailsQuery.mockReturnValue({
      data: mockPokemonData,
      isLoading: false,
      isError: false,
      error: undefined,
      refetch: vi.fn(),
    });
    mockedUsePokemonBackground.mockReturnValue([
      { primary: '#FFD700', secondary: '#EEE8AA' },
    ]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('returns "No Pokémon selected" if no name param is provided', () => {
    mockedUseParams.mockReturnValue({ name: undefined });
    render(
      <MemoryRouter>
        <CardDetails />
      </MemoryRouter>
    );
    expect(screen.getByText('No Pokémon selected')).toBeInTheDocument();
  });

  test('renders loading state when isLoading is true', () => {
    mockedUseGetPokemonOutletDetailsQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: undefined,
      refetch: vi.fn(),
    });
    render(
      <MemoryRouter initialEntries={['/pokemon/pikachu']}>
        <CardDetails />
      </MemoryRouter>
    );
    expect(screen.getByTestId('poke-loader')).toBeInTheDocument();
  });

  test('renders error state when isError is true', async () => {
    mockedUseGetPokemonOutletDetailsQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error('API error'),
      refetch: vi.fn(),
    });
    render(
      <MemoryRouter initialEntries={['/pokemon/pikachu']}>
        <CardDetails />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/API error/i)).toBeInTheDocument();
    });
  });

  test('renders pokemon details correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/pokemon/pikachu']}>
        <CardDetails />
      </MemoryRouter>
    );
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('#025')).toBeInTheDocument();
    const img = screen.getByAltText('pikachu');
    expect(img).toHaveAttribute('src', 'pikachu.png');
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('electric');
    expect(screen.getByText(/6 kg/i)).toBeInTheDocument();
    expect(screen.getByText(/0\.4 m/i)).toBeInTheDocument();
    expect(screen.getByText('thunder-shock')).toBeInTheDocument();
    expect(screen.getByText('quick-attack')).toBeInTheDocument();
    expect(screen.getByText('35')).toBeInTheDocument();
    expect(screen.getByText('55')).toBeInTheDocument();
  });

  test('calls navigate("/") when details-close element is clicked', () => {
    const navigateMock = vi.fn();
    mockedUseNavigate.mockReturnValue(navigateMock);
    render(
      <MemoryRouter initialEntries={['/pokemon/pikachu']}>
        <CardDetails />
      </MemoryRouter>
    );
    const container = document.querySelector('.card-details');
    expect(container).toBeDefined();
    const detailsClose = container?.querySelector('.details-close');
    expect(detailsClose).toBeDefined();
    if (detailsClose) {
      fireEvent.click(detailsClose);
      expect(navigateMock).toHaveBeenCalledWith('/');
    }
  });

  test('applies correct background color from usePokemonBackground', () => {
    render(
      <MemoryRouter initialEntries={['/pokemon/pikachu']}>
        <CardDetails />
      </MemoryRouter>
    );
    const container = screen.getByText('pikachu').closest('.card-details');
    expect(container).toHaveStyle({ background: '#FFD700' });
  });
});
