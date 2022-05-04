import { useEffect, useState } from 'react';
import { useLocalStorage } from '@hooks';

const pallet = {
  dark: {
    '--c-primary-light': '#2d2c34',
    '--c-font': 'white',
    '--c-border': 'black',
    '--c-card-background': 'rgb(5, 5, 21)',
  },
  light: {
    '--c-primary-light': 'rgb(255, 230, 220)',
    '--c-font': 'black',
    '--c-border': '#eaeaea',
    '--c-card-background': 'white',
  },
} as const;

type Theme = keyof typeof pallet;
type ThemeProps = keyof typeof pallet[Theme];
type UseThemeProps = {
  theme: Theme;
};
export const useTheme = (props?: UseThemeProps) => {
  const [themeOnLocalStorage, setThemeOnLocalStorage] = useLocalStorage<Theme>('theme', props?.theme ?? 'light');
  const [theme, setTheme] = useState<Theme>(themeOnLocalStorage ?? props?.theme ?? 'light');

  useEffect(() => {
    const setStyleProp = (prop: ThemeProps) => document.documentElement.style.setProperty(prop, pallet[theme][prop]);
    Object.keys(pallet[theme]).forEach((key) => setStyleProp(key as ThemeProps));
    setThemeOnLocalStorage(theme);
  }, [theme]);

  return { theme, setTheme };
};
