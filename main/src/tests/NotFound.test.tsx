import { render, screen } from '@testing-library/react';
import NotFound from '../views/NotFound/NotFound';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router';

describe('NotFound Component', () => {
  it('renders NotFound content with image, heading and Return button', () => {
    render(
      <MemoryRouter initialEntries={['/404']}>
        <Routes>
          <Route path="/404" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    const heading = screen.getByText(/Not Found\./i);
    expect(heading).toBeInTheDocument();

    const returnButton = screen.getByRole('button', { name: /Return/i });
    expect(returnButton).toBeInTheDocument();

    const image = screen.getByAltText('');
    expect(image).toBeInTheDocument();
  });

  it('navigates to /404 when rendered on an unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/some/unknown/path']}>
        <Routes>
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    const heading = screen.getByText(/Not Found\./i);
    expect(heading).toBeInTheDocument();
  });
});
