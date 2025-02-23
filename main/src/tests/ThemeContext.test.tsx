import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function TestConsumer() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="toggle-type">{typeof toggleTheme}</span>
    </div>
  );
}

describe('ThemeContext', () => {
  test('default value should be light and toggleTheme should be a function', () => {
    render(<TestConsumer />);
    expect(screen.getByTestId('theme').textContent).toBe('light');
    expect(screen.getByTestId('toggle-type').textContent).toBe('function');
  });
});
