import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, beforeEach } from 'vitest';

import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { ThemeProvider } from '../context/ThemeProvider';

function TestConsumer() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button data-testid="toggle-btn" onClick={toggleTheme}>
        Toggle
      </button>
    </div>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  test('provides default theme "light" if no value in localStorage', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme').textContent).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('poke_theme')).toBe('light');
  });

  test('uses theme from localStorage if available', () => {
    localStorage.setItem('poke_theme', 'dark');

    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme').textContent).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  test('toggleTheme switches theme between light and dark', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    const themeSpan = screen.getByTestId('theme');
    const toggleBtn = screen.getByTestId('toggle-btn');

    expect(themeSpan.textContent).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('poke_theme')).toBe('light');

    fireEvent.click(toggleBtn);

    expect(themeSpan.textContent).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('poke_theme')).toBe('dark');

    fireEvent.click(toggleBtn);

    expect(themeSpan.textContent).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('poke_theme')).toBe('light');
  });
});
