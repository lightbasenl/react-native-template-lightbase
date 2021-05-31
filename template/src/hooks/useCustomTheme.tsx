import { useStore } from './useStore';

const lightTheme = {
  text: '#000000',
  canvas: '#FFFFFF',
  background: '#F9F7F4',
  link: '#2F80ED',
  border: '#000000',
  notification: '#f50057',
} as const;

const darkTheme = {
  text: '#FFFFFF',
  canvas: '#000000',
  background: '#F9F7F4',
  link: '#2F80ED',
  border: '#000000',
  notification: '#f50057',
} as const;

const themeOptions = {
  light: lightTheme,
  dark: darkTheme,
};

export function useCustomTheme() {
  const theme = useStore((store) => store.theme);
  return themeOptions[theme];
}
