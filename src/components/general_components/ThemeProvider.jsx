import React, { createContext, useState, useEffect } from 'react';
import themes from '../themes.js';

export const ThemeContext = createContext({
  theme: 'chilly',
  setTheme: () => {}
});

// // Palette is an object containing key-value pairs of CSS variables
// '--bg': '#f4ecd8', etc.
// It sets it on the html element via documentElement.style
function applyTheme(name) {
  const palette = themes[name] || themes.chilly;
  Object.entries(palette).forEach(([k, v]) => {
    document.documentElement.style.setProperty(k, v);
  });
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'chilly';
  });

  // useEffect makes sense here because you're updating 
  // local storage and not the app itself

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;