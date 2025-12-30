import React, { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';
const THEME_LIST = [
  { key: 'chilly', label: 'Chilly' },
  { key: 'warm',   label: 'Warm'   },
  { key: 'dark',   label: 'Dark'   },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className="theme-switcher" role="radiogroup" aria-label="Theme">
      {THEME_LIST.map(t => (
        <button
          key={t.key}
          role="radio"
          aria-checked={theme === t.key}
          className={`swatch  button-38 ${theme === t.key ? 'selected' : ''}`}
          onClick={() => setTheme(t.key)}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setTheme(t.key)}
          title={t.label}
        >
          <span className="swatch-inner" />
          <span className="sr-only">{t.label}</span>
        </button>
      ))}
    </div>
  );
}