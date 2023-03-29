import React from 'react';
import {Animated, Dimensions} from 'react-native';
import {
  GestureHandlerRootView,
  PinchGestureHandler,
  State,
} from 'react-native-gesture-handler';

const screen = Dimensions.get('window');

const PinchableBox = ({image, ...props}) => {
  let scale = new Animated.Value(1);

  const onPinchEvent = Animated.event(
    [
      {
        nativeEvent: {scale: this.scale},
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  const onPinchStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(this.scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <GestureHandlerRootView>
      <PinchGestureHandler
        onGestureEvent={onPinchEvent}
        onHandlerStateChange={onPinchStateChange}>
        <Animated.Image
          source={{uri: image}}
          style={{
            width: screen.width,
            height: screen.height,
            transform: [{scale: this.scale}],
          }}
          resizeMode="contain"
        />
      </PinchGestureHandler>
    </GestureHandlerRootView>
  );
};

export default PinchableBox;
