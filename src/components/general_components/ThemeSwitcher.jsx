import React, { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <select value={theme} onChange={e => setTheme(e.target.value)}>
      <option value="chilly">Chilly</option>
      <option value="warm">Dark</option>
    </select>
  );
}