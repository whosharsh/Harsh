
import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';

type Theme = 'light' | 'dark';
type ThemePreference = 'light' | 'dark' | 'system';

interface ThemeContextType {
  themePreference: ThemePreference;
  setThemePreference: (theme: ThemePreference) => void;
  theme: Theme; // The currently active theme
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themePreference, setThemePreference] = useState<ThemePreference>('system');
  const [theme, setTheme] = useState<Theme>('light');

  // Effect to initialize preference from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as ThemePreference | null;
    setThemePreference(storedTheme || 'system');
  }, []);

  // Effect to listen to system changes and update the active theme
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const getSystemTheme = () => (mediaQuery.matches ? 'dark' : 'light');

    const handleSystemThemeChange = () => {
      if (themePreference === 'system') {
        setTheme(getSystemTheme());
      }
    };

    if (themePreference === 'system') {
      setTheme(getSystemTheme());
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    } else {
      setTheme(themePreference);
    }
  }, [themePreference]);

  // Effect to apply theme to DOM
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Custom setter to save to localStorage
  const handleSetThemePreference = (pref: ThemePreference) => {
    localStorage.setItem('theme', pref);
    setThemePreference(pref);
  };
  
  const toggleTheme = useCallback(() => {
    // This makes the toggle button switch between light and dark explicitly
    const newTheme = theme === 'light' ? 'dark' : 'light';
    handleSetThemePreference(newTheme);
  }, [theme]);

  const value = { themePreference, setThemePreference: handleSetThemePreference, theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
