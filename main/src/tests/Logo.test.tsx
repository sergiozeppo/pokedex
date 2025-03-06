import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Logo from '../components/Logo/Logo';

describe('Logo Component', () => {
  test('renders logo image with correct attributes', () => {
    render(<Logo />);

    const logoImage = screen.getByRole('img', { name: /pokedex logo/i });
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveClass('_logo_16f863');
  });
});
