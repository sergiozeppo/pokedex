import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, beforeEach, vi } from 'vitest';
import { Provider } from 'react-redux';
import { setupStore } from '../store';
import SearchBar from '../components/SearchBar/SearchBar';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const mockAppRouterContext = {
  push: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn(),
  refresh: vi.fn(),
  forward: vi.fn(),
  back: vi.fn(),
};

describe('SearchBar Component', () => {
  let store = setupStore();

  beforeEach(() => {
    store = setupStore();
  });

  test('renders search input, search button, theme switcher and error button', () => {
    render(
      <AppRouterContext.Provider value={mockAppRouterContext}>
        <Provider store={store}>
          <SearchBar />
        </Provider>
      </AppRouterContext.Provider>
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
      <AppRouterContext.Provider value={mockAppRouterContext}>
        <Provider store={store}>
          <SearchBar />
        </Provider>
      </AppRouterContext.Provider>
    );
    const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'pikachu' } });
    expect(input.value).toBe('pikachu');
  });

  test('dispatches search query on Enter key press', () => {
    render(
      <AppRouterContext.Provider value={mockAppRouterContext}>
        <Provider store={store}>
          <SearchBar />
        </Provider>
      </AppRouterContext.Provider>
    );
    const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'pikachu' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    const state = store.getState();
    expect(state.searchQuerySlice.value).toBe('pikachu');
  });

  test('dispatches search query on clicking search button', () => {
    render(
      <AppRouterContext.Provider value={mockAppRouterContext}>
        <Provider store={store}>
          <SearchBar />
        </Provider>
      </AppRouterContext.Provider>
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
        <AppRouterContext.Provider value={mockAppRouterContext}>
          <Provider store={store}>
            <SearchBar />
          </Provider>
        </AppRouterContext.Provider>
      );
      const errorButton = screen.getByRole('button', { name: /ERROR!/i });
      fireEvent.click(errorButton);
    }).toThrow('Custom error for test ErrorBoundary');
  });

  test('updates input value correctly when typing and triggers search on Enter and button click', async () => {
    render(
      <AppRouterContext.Provider value={mockAppRouterContext}>
        <Provider store={store}>
          <SearchBar />
        </Provider>
      </AppRouterContext.Provider>
    );
    const input = screen.getByPlaceholderText('Search');
    const user = userEvent.setup();

    await user.type(input, 'pikachu');
    expect(input).toHaveValue('pikachu');

    await user.type(input, '{enter}');
    expect(input).toHaveValue('pikachu');

    const button = screen.getByRole('button', { name: /Search/i });
    await user.click(button);
    expect(input).toHaveValue('pikachu');
  });
});
