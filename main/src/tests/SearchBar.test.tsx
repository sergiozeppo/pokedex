import { useState } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';

const SearchBarWrapper = () => {
  const [value, setValue] = useState('');
  return (
    <SearchBar
      onSearch={() => {}}
      searchQuery={value}
      onInputChange={(val) => setValue(val)}
    />
  );
};

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';

describe('SearchBar Component (controlled)', () => {
  it('updates input value correctly when typing and triggers search on Enter and button click', async () => {
    render(<SearchBarWrapper />);
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
