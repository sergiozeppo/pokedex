import { render, screen } from '@testing-library/react';
import PokeLoader from '../components/PokeLoader/PokeLoader';
import { describe, expect, test } from 'vitest';

describe('PokeLoader Component', () => {
  test('renders loader with pokeball animation', () => {
    render(<PokeLoader />);

    const container = screen.getAllByRole('generic');
    expect(container.length).toBe(3);
  });
});
