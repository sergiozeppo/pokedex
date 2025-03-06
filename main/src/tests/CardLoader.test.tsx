import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import CardLoader from '../components/CardLoader/CardLoader';

describe('CardLoader Component', () => {
  test('renders loader with skeleton content', () => {
    render(<CardLoader />);

    expect(screen.getByText('#000')).toBeInTheDocument();
    expect(screen.getByAltText('loader')).toHaveAttribute(
      'src',
      '/assets/img/poke-loader.png'
    );
    expect(screen.getByText('Pokémon Name')).toBeInTheDocument();
    expect(screen.getByText('Abilities: Some abilities')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveClass('_card-img_1f2933');
  });
});
