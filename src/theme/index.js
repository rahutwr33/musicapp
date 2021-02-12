import React, {createContext, useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {Appearance, AppearanceProvider} from 'react-native-appearance';

import lightTheme from './light';
import darkTheme from './dark';
const defaultMode = Appearance.getColorScheme() || 'light';
const ThemeContext = createContext({
  mode: defaultMode,
  setMode: (mode) => console.log(mode),
});

const ManageThemeProvider = ({children}) => {
  const [themeState, setThemeState] = useState(defaultMode);
  const setMode = (mode) => {
    setThemeState(mode);
  };
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setThemeState(colorScheme);
    });
    return () => subscription.remove();
  }, []);
  return (
    <ThemeContext.Provider value={{mode: themeState, setMode}}>
      <ThemeProvider
        theme={themeState === 'dark' ? darkTheme.theme : lightTheme.theme}>
        <>
          <StatusBar
            barStyle={themeState === 'dark' ? 'dark-content' : 'light-content'}
          />
          {children}
        </>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
const ThemeManager = ({children}) => (
  <AppearanceProvider>
    <ManageThemeProvider>{children}</ManageThemeProvider>
  </AppearanceProvider>
);

export const useTheme = () => React.useContext(ThemeContext);
export default ThemeManager;
