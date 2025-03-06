import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Main from '../views/Main/Main';
import { Provider } from 'react-redux';
import { setupStore, RootState } from '../store';

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: () => {},
  }),
}));

describe('Main Component', () => {
  it('renders main container with content wrapper, CardList and Modal and shows "No Pokémon available" when there is no data', () => {
    const preloadedState: Partial<RootState> = {
      currentPokemonsSlice: { pokemons: [] },
      selectedPokemonsSlice: [],
    };
    const store = setupStore(preloadedState);

    render(
      <Provider store={store}>
        <Main />
      </Provider>
    );

    const mainContainer = screen.getByRole('main');
    expect(mainContainer).toBeInTheDocument();

    const contentWrapper = mainContainer.querySelector(
      '._content-wrapper_527f1a'
    );
    expect(contentWrapper).toBeInTheDocument();
    expect(screen.getByText(/No Pokémon available/i)).toBeInTheDocument();
  });

  it('renders CardList with cards and Modal with selected pokémons when data is present', () => {
    const preloadedState: Partial<RootState> = {
      currentPokemonsSlice: {
        pokemons: [
          {
            name: 'pikachu',
            url: 'pikachu.png',
          },
          {
            name: 'bulbasaur',
            url: 'bulbasaur.png',
          },
        ],
      },
      selectedPokemonsSlice: [
        {
          id: 1,
          name: 'pikachu',
          abilities: ['static'],
          imageUrl: 'pikachu.png',
        },
      ],
    };
    const store = setupStore(preloadedState);

    render(
      <Provider store={store}>
        <Main />
      </Provider>
    );

    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getAllByText(/pokémon/i).length).toBe(2);
    expect(screen.getByText(/selected/i)).toBeInTheDocument();
  });
});
