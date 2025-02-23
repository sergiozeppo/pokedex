import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { ThemeContext, ThemeContextType } from '../context/ThemeContext';
import { ThemeSwitcher } from '../components/ThemeSwitcher/ThemeSwitcher';

describe('ThemeSwitcher Component', () => {
  test('renders button with text "to dark" when theme is light', () => {
    const mockToggleTheme = vi.fn();
    const contextValue: ThemeContextType = {
      theme: 'light',
      toggleTheme: mockToggleTheme,
    };

    render(
      <ThemeContext.Provider value={contextValue}>
        <ThemeSwitcher />
      </ThemeContext.Provider>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('to dark');
  });

  test('renders button with text "to light" when theme is dark', () => {
    const mockToggleTheme = vi.fn();
    const contextValue: ThemeContextType = {
      theme: 'dark',
      toggleTheme: mockToggleTheme,
    };

    render(
      <ThemeContext.Provider value={contextValue}>
        <ThemeSwitcher />
      </ThemeContext.Provider>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('to light');
  });

  test('calls toggleTheme when button is clicked', () => {
    const mockToggleTheme = vi.fn();
    const contextValue: ThemeContextType = {
      theme: 'light',
      toggleTheme: mockToggleTheme,
    };

    render(
      <ThemeContext.Provider value={contextValue}>
        <ThemeSwitcher />
      </ThemeContext.Provider>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockToggleTheme).toHaveBeenCalled();
  });

  test('throws error if ThemeSwitcher is rendered with undefined context', () => {
    expect(() =>
      render(
        <ThemeContext.Provider value={undefined as unknown as ThemeContextType}>
          <ThemeSwitcher />
        </ThemeContext.Provider>
      )
    ).toThrow(
      'Please, use ThemeSwitcher within a ThemeProvider and Context API'
    );
  });
});
