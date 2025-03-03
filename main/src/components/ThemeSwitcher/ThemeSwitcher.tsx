import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!themeContext) {
    throw new Error(
      'Please, use ThemeSwitcher within a ThemeProvider and Context API'
    );
  }

  return (
    <button onClick={() => themeContext.toggleTheme()}>
      {themeContext.theme === 'light' ? 'to dark' : 'to light'}
    </button>
  );
};
