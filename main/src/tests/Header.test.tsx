import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Header from '../views/Header/Header';

describe('Header Component', () => {
  const mockProps = {
    onSearch: vi.fn(),
    searchQuery: '',
    onInputChange: vi.fn(),
  };

  test('renders logo and title', () => {
    render(<Header {...mockProps} />);

    expect(screen.getByAltText('Pokedex Logo')).toBeInTheDocument();
    expect(screen.getByText('Pokédex')).toBeInTheDocument();
  });

  test('renders SearchBar with correct props', () => {
    render(<Header {...mockProps} searchQuery="pikachu" />);

    const searchInput = screen.getByPlaceholderText('Search');
    expect(searchInput).toHaveValue('pikachu');
    expect(searchInput).toHaveClass('search-input');
  });
});
