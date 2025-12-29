import React, { createContext, useState, useEffect } from 'react';
import themes from '../themes.js'
export const ThemeContext = createContext({ theme: 'chilly', setTheme: () => {} });



// Palette is an object containing key-value pairs of CSS variables
// '--bg': '#f4ecd8', etc.
// It sets it on the html element via documentElement.style
function applyTheme(name) {
  const palette = themes[name] || themes.chilly;
  Object.entries(palette).forEach(([k, v]) => {
    document.documentElement.style.setProperty(k, v);
  });
}


function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('chilly');

  // Get the theme
  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'chilly';
    setTheme(saved);
  }, []);

  // Apply the theme
  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;