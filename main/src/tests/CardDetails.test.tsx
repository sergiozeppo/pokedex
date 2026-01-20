import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { Provider } from 'react-redux';
import { PokemonData } from '../../src/types/types';
import { setupStore } from '../../src/store';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import CardDetails from '../../app/pokemon/[name]/ClientCardDetails';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const mockPush = vi.fn();
const mockReplace = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    query: { name: 'pikachu' },
    push: mockPush,
    replace: mockReplace,
    asPath: '/pokemon/pikachu',
    isReady: true,
    pathname: '/pokemon/[name]',
    route: '/pokemon/[name]',
    refresh: '',
    basePath: '',
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
  })),
}));

const mockedUseRouter = vi.mocked(useRouter);

type MockTypeSprites = {
  front_default: string;
  other: {
    dream_world: {
      front_default: string;
    };
    'official-artwork': {
      front_default: string;
    };
  };
};

const mockPokemonData: PokemonData = {
  id: 25,
  name: 'pikachu',
  types: [
    {
      type: { name: 'electric', url: 'pikachu.png' },
      slot: 0,
    },
    { type: { name: 'flying', url: 'pikachu.png' }, slot: 1 },
  ],
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
  imageUrl: 'pikachu.png',
  abilities: [],
  sprites: {} as MockTypeSprites,
};

describe('CardDetails Component', () => {
  const mockPush = vi.fn();
  const mockReplace = vi.fn();

  beforeEach(() => {
    mockPush.mockClear();
    mockReplace.mockClear();

    mockedUseRouter.mockReturnValue({
      ...mockedUseRouter(),
      query: { name: 'pikachu' },
      push: mockPush,
      replace: mockReplace,
      asPath: '/pokemon/pikachu',
    } as unknown as AppRouterInstance);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (props = {}) => {
    return render(
      <Provider store={setupStore()}>
        <CardDetails pokemonData={mockPokemonData} {...props} />
      </Provider>
    );
  };

  test('renders pokemon details correctly', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('#025')).toBeInTheDocument();
      expect(screen.getByAltText('pikachu')).toHaveAttribute(
        'src',
        'pikachu.png'
      );
      expect(screen.getByText('electric')).toBeInTheDocument();
      expect(screen.getByText('flying')).toBeInTheDocument();
      expect(screen.getByText('6 kg')).toBeInTheDocument();
      expect(screen.getByText('0.4 m')).toBeInTheDocument();
      expect(screen.getByText('thunder-shock')).toBeInTheDocument();
      expect(screen.getByText('quick-attack')).toBeInTheDocument();
    });
  });

  test('handles close button click', async () => {
    renderComponent();

    fireEvent.click(screen.getByTestId('close'));

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalled();
    });
  });

  test('applies correct background colors', async () => {
    renderComponent();

    await waitFor(() => {
      const typeElements = screen.getAllByTestId('pokemon-type');
      expect(typeElements[0]).toHaveStyle('background-color: #00000000');
      expect(typeElements[1]).toHaveStyle('background-color: #00000000');
    });
  });

  test('displays base stats correctly', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('35')).toBeInTheDocument();
      expect(screen.getByText('55')).toBeInTheDocument();
      expect(screen.getByText('40')).toBeInTheDocument();
    });
  });
});
