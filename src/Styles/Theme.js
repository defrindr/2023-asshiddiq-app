import color from '@styles/Color';
import Size from '@styles/Spacing';
import ConfigTheme from '@config/Theme';
import Font from '@styles/Font';

export const Theme = theme => {
  let isDarkMode = false; //theme === ConfigTheme.dark;

  return {
    isDarkMode,
    color: isDarkMode ? color.darkMode : color.lightMode,
    colors: color,
    size: Size,
    fontWeight: Font.weight,
  };
};

export default Theme;
