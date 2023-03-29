import Config from '@config/index';
import ThemeContext from '@context/ThemeContext';
import {useState} from 'react';

const ThemeWrapper = ({children}) => {
  const [theme, setTheme] = useState(Config.theme.default);
  const themeProvider = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={themeProvider}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeWrapper;
