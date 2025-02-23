import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, test, expect, vi } from 'vitest';
import AppRoutes from '../components/AppRoutes/AppRoutes';

vi.mock('../views/Main/Main', () => ({
  default: (() => {
    const MockMain = () => <div data-testid="main-component">Main</div>;
    MockMain.displayName = 'MockMain';
    return MockMain;
  })(),
}));

vi.mock('../views/CardDetails/CardDetails', () => ({
  default: (() => {
    const MockCardDetails = () => (
      <div data-testid="card-details-component">Card Details</div>
    );
    MockCardDetails.displayName = 'MockCardDetails';
    return MockCardDetails;
  })(),
}));

vi.mock('../views/NotFound/NotFound', () => ({
  default: (() => {
    const MockNotFound = () => (
      <div data-testid="not-found-component">Not Found</div>
    );
    MockNotFound.displayName = 'MockNotFound';
    return MockNotFound;
  })(),
}));

describe('AppRoutes Component', () => {
  test('renders Main component at root route "/"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByTestId('main-component')).toBeInTheDocument();
  });

  test('renders CardDetails component at route "/pokemon/:name"', () => {
    render(
      <MemoryRouter initialEntries={['/pokemon/pikachu']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByTestId('main-component')).toBeInTheDocument();
  });

  test('renders NotFound component at route "/404"', () => {
    render(
      <MemoryRouter initialEntries={['/404']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByTestId('not-found-component')).toBeInTheDocument();
  });

  test('navigates to NotFound for unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByTestId('not-found-component')).toBeInTheDocument();
  });
});
