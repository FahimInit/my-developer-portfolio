'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { ThemeId } from '@/types';

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const THEME_STORAGE_KEY = 'portfolio_theme_id';

const THEME_CLASS_MAP: Record<ThemeId, string | null> = {
  obsidian: null, // Default :root variables
  linear: 'theme-linear',
  emerald: 'theme-emerald',
};

function applyThemeClass(theme: ThemeId): void {
  const body = document.body;
  body.classList.remove('theme-linear', 'theme-emerald');
  const nextClass = THEME_CLASS_MAP[theme];
  if (nextClass) {
    body.classList.add(nextClass);
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>('obsidian');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'obsidian' || saved === 'linear' || saved === 'emerald') {
        setThemeState(saved);
        applyThemeClass(saved);
      }
    } catch {
      // Ignore storage access errors in restricted browsing contexts.
    }
  }, []);

  const setTheme = useCallback((nextTheme: ThemeId) => {
    setThemeState(nextTheme);
    applyThemeClass(nextTheme);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // Ignore storage write errors.
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }
  return ctx;
}
