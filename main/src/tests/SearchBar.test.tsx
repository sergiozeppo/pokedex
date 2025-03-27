import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { setupStore } from '../store';
import SearchBar from '../components/SearchBar/SearchBar';

describe('SearchBar Component', () => {
  let store = setupStore();

  beforeEach(() => {
    store = setupStore();
  });

  test('renders search input, search button, theme switcher and error button', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchBar />
        </MemoryRouter>
      </Provider>
    );

    const input = screen.getByPlaceholderText('Search');
    expect(input).toBeInTheDocument();

    const searchButton = screen.getByRole('button', { name: /Search/i });
    expect(searchButton).toBeInTheDocument();

    const errorButton = screen.getByRole('button', { name: /ERROR!/i });
    expect(errorButton).toBeInTheDocument();

    const themeSwitcher = screen.getByRole('button', { name: /to dark/i });
    expect(themeSwitcher).toBeInTheDocument();
  });

  test('updates input value on change', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchBar />
        </MemoryRouter>
      </Provider>
    );
    const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'pikachu' } });
    expect(input.value).toBe('pikachu');
  });

  test('dispatches search query on Enter key press', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchBar />
        </MemoryRouter>
      </Provider>
    );
    const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'pikachu' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    const state = store.getState();
    expect(state.searchQuerySlice.value).toBe('pikachu');
  });

  test('dispatches search query on clicking search button', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchBar />
        </MemoryRouter>
      </Provider>
    );
    const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
    const searchButton = screen.getByRole('button', { name: /Search/i });
    fireEvent.change(input, { target: { value: 'bulbasaur' } });
    fireEvent.click(searchButton);

    const state = store.getState();
    expect(state.searchQuerySlice.value).toBe('bulbasaur');
  });

  test('throws error when clicking error button', () => {
    expect(() => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <SearchBar />
          </MemoryRouter>
        </Provider>
      );
      const errorButton = screen.getByRole('button', { name: /ERROR!/i });
      fireEvent.click(errorButton);
    }).toThrow('Custom error for test ErrorBoundary');
  });

  test('updates input value correctly when typing and triggers search on Enter and button click', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchBar />
        </MemoryRouter>
      </Provider>
    );
    const input = screen.getByPlaceholderText('Search');
    const user = userEvent.setup();
    await user.type(input, 'pikachu');
    expect(input).toHaveValue('pikachu');
    await user.type(input, '{enter}');
    expect(input).toHaveValue('pikachu');
    const button = screen.getByRole('button', { name: /search/i });
    await user.click(button);
    expect(input).toHaveValue('pikachu');
  });
});
