import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import CardDetails from '../views/CardDetails/CardDetails';
import { MemoryRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { usePokemonBackground } from '../utils/usePokemonBackground/usePokemonBackground';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock('../utils/usePokemonBackground/usePokemonBackground', () => ({
  usePokemonBackground: vi.fn(),
}));

const mockedUseNavigate = vi.mocked(useNavigate, true);
const mockedUsePokemonBackground = vi.mocked(usePokemonBackground, true);

const mockPokemonData = {
  id: 25,
  name: 'pikachu',
  imageUrl: 'pikachu.png',
  types: [{ slot: 1, type: { name: 'electric', url: '' } }],
  weight: 60,
  height: 4,
  moves: [
    { move: { name: 'thunder-shock' } },
    { move: { name: 'quick-attack' } },
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
    {
      ability: { name: 'static', url: 'https://pokeapi.co/api/v2/ability/9/' },
      is_hidden: false,
      slot: 1,
    },
  ],
};

const mockLoaderData = { data: mockPokemonData };

describe('CardDetails Component', () => {
  beforeEach(() => {
    const navigateMock = vi.fn();
    mockedUseNavigate.mockReturnValue(navigateMock);
    mockedUsePokemonBackground.mockReturnValue([
      { primary: '#FFD700', secondary: '#EEE8AA' },
    ]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('returns "No Pokémon selected" if no data is provided', () => {
    render(
      <MemoryRouter>
        <CardDetails
          params={{ name: '' }}
          loaderData={{
            data: {
              stats: [],
              moves: [],
              height: 0,
              weight: 0,
              id: 0,
              name: '',
              abilities: [],
              types: [],
            },
          }}
          matches={[
            {
              id: 'root',
              params: {},
              pathname: '/',
              data: undefined,
              handle: undefined,
            },
            {
              id: 'home',
              params: {},
              pathname: '/home',
              data: { data: [], page: 1, query: '' },
              handle: undefined,
            },
            {
              id: 'views/CardDetails/CardDetails',
              params: { name: '' },
              pathname: '/pokemon/',
              data: {
                data: {
                  stats: [],
                  moves: [],
                  height: 0,
                  weight: 0,
                  id: 0,
                  name: '',
                  abilities: [],
                  types: [],
                },
              },
              handle: undefined,
            },
          ]}
        />
      </MemoryRouter>
    );
    expect(screen.getByText('No Pokémon selected')).toBeInTheDocument();
  });

  test('renders pokemon details correctly', async () => {
    render(
      <MemoryRouter>
        <CardDetails
          loaderData={mockLoaderData}
          params={{ name: '' }}
          matches={[
            {
              id: 'root',
              params: {},
              pathname: '/',
              data: undefined,
              handle: undefined,
            },
            {
              id: 'home',
              params: {},
              pathname: '/home',
              data: {
                data: [{ name: 'pikachu', url: 'pikachu.png' }],
                page: 1,
                query: '',
              },
              handle: undefined,
            },
            {
              id: 'views/CardDetails/CardDetails',
              params: { name: 'pikachu' },
              pathname: '/pokemon/pikachu',
              data: { data: mockPokemonData },
              handle: undefined,
            },
          ]}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('#025')).toBeInTheDocument();
    expect(screen.getByAltText('pikachu')).toHaveAttribute(
      'src',
      'pikachu.png'
    );
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('electric');
    expect(screen.getByText(/6 kg/i)).toBeInTheDocument();
    expect(screen.getByText(/0\.4 m/i)).toBeInTheDocument();
    expect(screen.getByText('thunder-shock')).toBeInTheDocument();
    expect(screen.getByText('quick-attack')).toBeInTheDocument();
    expect(screen.getByText('35')).toBeInTheDocument();
  });

  test('calls navigate("/") when details-close element is clicked', () => {
    const navigateMock = vi.fn();
    mockedUseNavigate.mockReturnValue(navigateMock);

    render(
      <MemoryRouter>
        <CardDetails
          loaderData={mockLoaderData}
          params={{ name: '' }}
          matches={[
            {
              id: 'root',
              params: {},
              pathname: '/',
              data: undefined,
              handle: undefined,
            },
            {
              id: 'home',
              params: {},
              pathname: '/home',
              data: {
                data: [{ name: 'pikachu', url: 'pikachu.png' }],
                page: 1,
                query: '',
              },
              handle: undefined,
            },
            {
              id: 'views/CardDetails/CardDetails',
              params: { name: 'pikachu' },
              pathname: '/pokemon/pikachu',
              data: { data: mockPokemonData },
              handle: undefined,
            },
          ]}
        />
      </MemoryRouter>
    );

    const closeButton = screen
      .getByText('pikachu')
      .closest('.card-details')
      ?.querySelector('.details-close');
    expect(closeButton).toBeDefined();

    if (closeButton) {
      fireEvent.click(closeButton);
      expect(navigateMock).toHaveBeenCalledWith('/');
    }
  });

  test('applies correct background color from usePokemonBackground', () => {
    render(
      <MemoryRouter>
        <CardDetails
          loaderData={mockLoaderData}
          params={{ name: '' }}
          matches={[
            {
              id: 'root',
              params: {},
              pathname: '/',
              data: undefined,
              handle: undefined,
            },
            {
              id: 'home',
              params: {},
              pathname: '/home',
              data: {
                data: [{ name: 'pikachu', url: 'pikachu.png' }],
                page: 1,
                query: '',
              },
              handle: undefined,
            },
            {
              id: 'views/CardDetails/CardDetails',
              params: { name: 'pikachu' },
              pathname: '/pokemon/pikachu',
              data: { data: mockPokemonData },
              handle: undefined,
            },
          ]}
        />
      </MemoryRouter>
    );

    const container = screen.getByText('pikachu').closest('.card-details');
    expect(container).toHaveStyle({ background: '#FFD700' });
  });
});
