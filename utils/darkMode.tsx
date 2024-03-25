import { createContext, useContext, useReducer, useState } from "react";

export type IThemeContext = [boolean, (value: boolean) => void];

export const ThemeContext = createContext<IThemeContext | null>(null);

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider(props: { children: any }) {
  const [isDark, setIsDark] = useState(true);
  return (
    <ThemeContext.Provider value={[isDark, setIsDark]}>
      {props.children}
    </ThemeContext.Provider>
  );
}

