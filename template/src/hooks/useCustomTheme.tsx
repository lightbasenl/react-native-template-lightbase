import { useStore } from './useStore';

const lightTheme = {
  primary: {
    light: '#757ce8',
    main: '#3f50b5',
    dark: '#002884',
    contrastText: '#fff',
  },
  secondary: {
    light: '#ff7961',
    main: '#f44336',
    dark: '#ba000d',
    contrastText: '#000',
  },
  surface: {
    main: '#FFF',
    contrastText: '#000',
  },
  background: {
    main: '#FFF',
    contrastText: '#000',
  },
} as const;

const darkTheme = {
  primary: {
    light: '#e87ce8',
    main: '#b550b5',
    dark: '#842884',
    contrastText: '#fff',
  },
  secondary: {
    light: '#617961',
    main: '#364336',
    dark: '#002000',
    contrastText: '#000',
  },
  surface: {
    main: '#000',
    contrastText: '#FFF',
  },
  background: {
    main: '#FFF',
    contrastText: '#000',
  },
} as const;

const themeOptions = {
  light: lightTheme,
  dark: darkTheme,
};

export function useCustomTheme() {
  const theme = useStore((store) => store.theme);
  return themeOptions[theme];
}
