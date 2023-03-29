import {useCallback, useEffect, useState} from 'react';
import {Animated, Easing} from 'react-native';

const Title = ({children, ...props}) => {
  // animate the Title, bounce in and out
  const [translate, setTranslate] = useState(new Animated.Value(200));

  const handleAnimation = useCallback(async () => {
    Animated.sequence([
      Animated.timing(translate, {
        toValue: 200,
        duration: 1000,
        easing: Easing.elastic(1),
        useNativeDriver: false,
      }),
      Animated.timing(translate, {
        toValue: 0,
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }),
    ]).start();
  }, [translate]);

  useEffect(() => {
    // change scale value
    handleAnimation();
    return () => {};
  }, [handleAnimation]);

  return (
    <Animated.Text
      style={[
        props.style || {},
        {
          transform: [
            {
              translateY: translate.interpolate({
                inputRange: [1, 2],
                outputRange: [0, 10],
              }),
            },
          ],
        },
      ]}>
      {children || ''}
    </Animated.Text>
  );
};

export default Title;
