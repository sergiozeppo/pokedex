import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Header from '../views/Header/Header';
import { Provider } from 'react-redux';
import { setupStore } from '../store';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn().mockReturnValue('/'),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));

const store = setupStore();

const mockAppRouterContext = {
  push: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn(),
  refresh: vi.fn(),
  forward: vi.fn(),
  back: vi.fn(),
};

describe('Header Component', () => {
  test('renders logo and title', () => {
    render(
      <AppRouterContext.Provider value={mockAppRouterContext}>
        <Provider store={store}>
          <Header />
        </Provider>
      </AppRouterContext.Provider>
    );

    expect(screen.getByAltText('Pokedex Logo')).toBeInTheDocument();
    expect(screen.getByText('Pokédex')).toBeInTheDocument();
  });

  test('renders SearchBar', () => {
    render(
      <AppRouterContext.Provider value={mockAppRouterContext}>
        <Provider store={store}>
          <Header />
        </Provider>
      </AppRouterContext.Provider>
    );

    const searchInput = screen.getByPlaceholderText('Search');
    expect(searchInput).toBeInTheDocument();
  });

  test('renders specified number of buttons', () => {
    const { container } = render(
      <AppRouterContext.Provider value={mockAppRouterContext}>
        <Provider store={store}>
          <Header />
        </Provider>
      </AppRouterContext.Provider>
    );

    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBe(3);
  });
});
