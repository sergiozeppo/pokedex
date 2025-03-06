'use client';

import { useEffect, useState } from 'react';
import { Theme, ThemeContext } from './ThemeContext';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const getTheme = (): Theme => {
    const theme =
      typeof window !== 'undefined'
        ? (localStorage.getItem('poke_theme') as Theme) || 'light'
        : 'light';

    return theme;
  };

  const [theme, setTheme] = useState<Theme>(getTheme);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('poke_theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
