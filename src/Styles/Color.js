const neutral = '#FFFFFF';
const primary = '#6017bf';
const secondary = '#6C757D';
const tertiary = '#17A2B8';
const success = '#28A745';
const warning = '#FFC107';
const danger = '#DC3545';
const info = '#17A2B8';
const dark = '#343A40';
const text = '#212529';
const transparent = '#00000000';
const white = '#FFFFFF';
const black = '#343A40';

const lightMode = {
  neutral,
  primary,
  secondary,
  tertiary,
  success,
  warning,
  danger,
  info,
  dark,
  text,
  transparent,
  white,
  black,
};

const darkMode = {
  ...lightMode,
  neutral: '#343A40',
  dark: '#FFFFFF',
};

const colorScaling = {
  s1: 0.1,
  s2: 0.2,
  s3: 0.3,
  s4: 0.4,
  s5: 0.5,
  s6: 0.6,
  s7: 0.7,
  s8: 0.8,
  s9: 0.9,
  s10: 1,
};

const Scale = (type, scale) => {
  // if start with #, then it's a hex color
  let color = '';
  if (type.startsWith('#')) {
    color = type;
  } else {
    color = lightMode[type] || neutral;
  }

  const colorValue = color.replace('#', '');
  const r = parseInt(colorValue.substring(0, 2), 16);
  const g = parseInt(colorValue.substring(2, 4), 16);
  const b = parseInt(colorValue.substring(4, 6), 16);

  const newR = Math.round(r * scale);
  const newG = Math.round(g * scale);
  const newB = Math.round(b * scale);

  const newColor = `#${newR.toString(16)}${newG.toString(16)}${newB.toString(
    16,
  )}`;

  return newColor;
};

// random color generator
const RandomColor = () => {
  const colors = Object.values(lightMode);
  const randomIndex = Math.floor(Math.random() * colors.length);

  return colors[randomIndex];
};

export default {colorScaling, Scale, RandomColor, lightMode, darkMode};
export {colorScaling, Scale, RandomColor, lightMode, darkMode};
