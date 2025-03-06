import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Header from '../views/Header/Header';
import { Provider } from 'react-redux';
import { setupStore } from '../store';

const store = setupStore();

describe('Header Component', () => {
  test('renders logo and title', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByAltText('Pokedex Logo')).toBeInTheDocument();
    expect(screen.getByText('Pokédex')).toBeInTheDocument();
  });

  test('renders SearchBar', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText('Search');
    expect(searchInput).toBeInTheDocument();
  });

  test('renders specified number of buttons', () => {
    const { container } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBe(3);
  });
});
