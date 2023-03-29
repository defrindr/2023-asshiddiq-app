import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {scaleHeight, scaleWidth} from '../Utils/Size';

export default function NotFound() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Image
          source={require('@assets/images/wrong.png')}
          style={styles.image}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: scaleHeight(90),
  },
  container: {},
  image: {
    width: scaleWidth(70),
    height: scaleWidth(40),
  },
});
