import React from 'react';
import {scaleHeight, scaleWidth} from '@utils/Size';
import {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useEffect} from 'react';

export default function Carousel({
  items,
  count = 1,
  active = 0,
  horizontal = true,
  renderItem = ({item, index}) => {
    <></>;
  },
  control = false,
  ...props
}) {
  const [pagingEnabled, setPagingEnabled] = useState(true);
  const scrollViewRef = React.createRef();
  const [activeSlide, setActiveSlide] = useState(0);

  // handle if count of items is not enough to fill the screen
  const onScroll = event => {
    const {contentOffset, contentSize, layoutMeasurement} = event.nativeEvent;
    if (horizontal) {
      if (contentOffset.x === 0) {
        setActiveSlide(0);
      } else {
        setActiveSlide(Math.round(contentOffset.x / scaleWidth(100)));
      }

      if (contentOffset.x >= contentSize.width - layoutMeasurement.width) {
        // end of scroll
        setPagingEnabled(false);
      } else {
        setPagingEnabled(true);
      }
    } else {
      if (contentOffset.y === 0) {
        setActiveSlide(0);
      } else {
        setActiveSlide(Math.round(contentOffset.x / scaleHeight(100)));
      }

      if (contentOffset.y >= contentSize.height - layoutMeasurement.height) {
        // end of scroll
        setPagingEnabled(false);
      } else {
        setPagingEnabled(true);
      }
    }
  };

  const triggerScroll = toSlide => {
    if (horizontal) {
      scrollViewRef.current.scrollTo({
        x: scaleWidth(100) * toSlide,
        animated: true,
      });
    } else {
      scrollViewRef.current.scrollTo({
        y: scaleHeight(100) * toSlide,
        animated: true,
      });
    }
  };

  const onNextSlide = () => {
    if (activeSlide === items.length - 1) {
      return;
    }
    triggerScroll(activeSlide + 1);
    setActiveSlide(() => activeSlide + 1);
  };

  const onPrevSlide = () => {
    if (activeSlide === 0) {
      return;
    }
    triggerScroll(activeSlide - 1);
    setActiveSlide(() => activeSlide - 1);
  };

  useEffect(() => {
    if (active !== activeSlide) {
      triggerScroll(active);
      setActiveSlide(active);
    }
  }, [active]);

  return (
    <View
      style={{
        position: 'relative',
        flexDirection: horizontal ? 'row' : 'column',
      }}>
      <ScrollView
        ref={scrollViewRef}
        scrollEventThrottle={200}
        decelerationRate={'fast'}
        pagingEnabled={pagingEnabled}
        onScroll={onScroll}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        {...props}>
        {items.map((item, index) => {
          return renderItem({item, index});
        })}
      </ScrollView>
      {
        // render arrow if count of items is not enough to fill the screen
        control && (
          <>
            {activeSlide !== 0 && (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  padding: scaleWidth(5),
                  top: 0,
                  height: '100%',
                  left: 0,
                  zIndex: 1,
                  position: 'absolute',
                  justifyContent: 'center',
                }}
                onPress={() => onPrevSlide()}>
                <Icon name="chevron-left" size={scaleWidth(5)} color="white" />
              </TouchableOpacity>
            )}
            {activeSlide !== items.length - 1 && (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  padding: scaleWidth(5),
                  top: 0,
                  height: '100%',
                  right: 0,
                  zIndex: 1,
                  position: 'absolute',
                  justifyContent: 'center',
                }}
                onPress={() => onNextSlide()}>
                <Icon name="chevron-right" size={scaleWidth(5)} color="white" />
              </TouchableOpacity>
            )}
          </>
        )
      }
    </View>
  );
}
