import {useCallback, useEffect, useState} from 'react';
import {Animated, Easing} from 'react-native';

const Logo = ({source, ...props}) => {
  // animate the logo, bounce in and out
  const [scale, setScale] = useState(new Animated.Value(1));

  const handleAnimation = useCallback(async () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1,
        duration: 0,
        easing: Easing.bounce,
        useNativeDriver: false,
      }),
      Animated.timing(scale, {
        toValue: 0.6,
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 1000,
        easing: Easing.bounce,
        useNativeDriver: false,
      }),
    ]).start();
  }, [scale]);

  useEffect(() => {
    // change scale value
    handleAnimation();
    return () => {};
  }, [handleAnimation]);

  return (
    <Animated.Image
      source={source}
      style={[
        props.style || {},
        {
          resizeMode: 'contain',
          transform: [
            {
              scale: scale,
            },
          ],
        },
      ]}
      resizeMode="contain"
    />
  );
};

export default Logo;
