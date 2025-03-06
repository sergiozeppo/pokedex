import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NotFound from '../../pages/404';

const mockedUseRouter = vi.fn();
vi.mock('next/router', () => ({
  useRouter: () => mockedUseRouter(),
}));

describe('NotFound Component', () => {
  it('renders NotFound content with image, heading and Return link', () => {
    mockedUseRouter.mockReturnValue({
      push: vi.fn(),
      prefetch: vi.fn().mockResolvedValue(null),
    });

    render(<NotFound />);

    const heading = screen.getByRole('heading', { name: /Not Found\./i });
    expect(heading).toBeInTheDocument();

    const returnLink = screen.getByRole('link', { name: /Return/i });
    expect(returnLink).toBeInTheDocument();

    const image = screen.getByAltText('not-found');
    expect(image).toBeInTheDocument();
  });

  it('navigates to "/" when Return link is clicked', () => {
    render(<NotFound />);

    const returnLink = screen.getByRole('link', { name: /Return/i });
    expect(returnLink).toHaveAttribute('href', '/');
  });
});
