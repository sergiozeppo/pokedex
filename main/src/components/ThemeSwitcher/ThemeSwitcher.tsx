import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export const ThemeSwitcher = () => {
  const themeContext = useContext(ThemeContext);

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
