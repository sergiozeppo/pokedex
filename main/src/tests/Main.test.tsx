import { render, screen } from '@testing-library/react';

import Main from '../views/Main/Main';
import { MemoryRouter } from 'react-router';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { setupStore } from '../store';

const store = setupStore();

describe('Main Component', () => {
  it('renders main container with CardList and Outlet', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      </Provider>
    );

    const mainContainer = screen.getByRole('main');
    expect(mainContainer.querySelector('.content-wrapper')).toBeInTheDocument();
    expect(mainContainer.querySelector('.card-list')).toBeInTheDocument();
  });

  it('renders "No Pokémon available" when pokemons array is empty', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/No Pokémon available/i)).toBeInTheDocument();
  });
});
