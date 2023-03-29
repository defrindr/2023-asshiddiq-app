// dynamic size for all devices
import {Dimensions, PixelRatio, Platform} from 'react-native';

let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

if (windowHeight < windowWidth) {
  // landscape
  console.log('landscape');
  let temp = windowWidth;
  windowWidth = windowHeight;
  windowHeight = temp;
} else {
  // portrait
  console.log('portrait');
}

const convertToNumber = size => {
  if (typeof size === 'number') {
    return size;
  }

  try {
    return parseFloat(size, 10);
  } catch (error) {
    return 0;
  }
};
/**
 * Get size depend on device width (percentage)
 * @param {*} size
 * @returns
 */
const scaleWidth = size => {
  // convert size to float
  let dimensionWidth = windowWidth * (convertToNumber(size) / 100);

  return PixelRatio.roundToNearestPixel(dimensionWidth);
};

/**
 * Get size depend on device height (percentage)
 * @param {*} size
 * @returns
 */
const scaleHeight = size => {
  let dimensionHeight = windowHeight * (convertToNumber(size) / 100);

  return PixelRatio.roundToNearestPixel(dimensionHeight);
};

const scaleMin = size => {
  const dimension =
    Math.min(windowWidth, windowHeight) * (convertToNumber(size) / 100);

  return PixelRatio.roundToNearestPixel(dimension);
};

const scaleMax = size => {
  const dimension =
    Math.max(windowWidth, windowHeight) * (convertToNumber(size) / 100);

  return PixelRatio.roundToNearestPixel(dimension);
};

const onChangeOrientation = that => {
  Dimensions.addEventListener('change', newDimensions => {
    // Retrieve and save new dimensions
    let screenWidth = newDimensions.window.width;
    let screenHeight = newDimensions.window.height;

    that.setState({
      orientation: screenWidth < screenHeight ? 'portrait' : 'landscape',
    });
  });
};

/**
 * Wrapper function that removes orientation change listener and should be invoked in
 * componentWillUnmount lifecycle method of every class component (UI screen) that
 * listenOrientationChange function has been invoked. This should be done in order to
 * avoid adding new listeners every time the same component is re-mounted.
 */
const removeOnChangeOrientation = () => {
  Dimensions.removeEventListener('change', () => {});
};

function isIPhoneXSize() {
  return windowHeight === 812 || windowWidth === 812;
}

function isIPhoneXrSize() {
  return windowHeight === 896 || windowWidth === 896;
}

function isIphoneX() {
  return (
    // This has to be iOS
    Platform.OS === 'ios' &&
    // Check either, iPhone X or XR
    (isIPhoneXSize() || isIPhoneXrSize())
  );
}

const HEADER_HEIGHT = Platform.select({
  ios: isIphoneX() ? 89 : 64,
  android: 56,
});

export {
  scaleWidth,
  scaleHeight,
  onChangeOrientation,
  removeOnChangeOrientation,
  HEADER_HEIGHT,
  scaleMin,
  scaleMax,
};
export default {
  scaleWidth,
  scaleHeight,
  onChangeOrientation,
  removeOnChangeOrientation,
  HEADER_HEIGHT,
  scaleMin,
  scaleMax,
};
