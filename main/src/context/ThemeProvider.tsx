import { useEffect, useState } from 'react';
import { Theme, ThemeContext } from './ThemeContext';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const getTheme = (): Theme => {
    if (typeof window === 'undefined') return 'light';
    const theme = (localStorage.getItem('poke_theme') as Theme) || 'light';
    return theme;
  };

  const [theme, setTheme] = useState<Theme>(getTheme);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    localStorage.setItem('poke_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
