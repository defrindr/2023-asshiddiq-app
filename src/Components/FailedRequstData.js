import Theme from '@styles/Theme';
import {scaleWidth} from '@utils/Size';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function FailedRequestData({
  onRetry = () => {},
  setFailedFetch = () => {},
}) {
  return (
    <View style={styles().wrapper}>
      <Text style={styles().text}>Gagal memuat data</Text>
      <TouchableOpacity
        onPress={async () => {
          setFailedFetch(false);
          await onRetry();
        }}
        style={styles().button}>
        <Text style={styles().buttonText}>Coba lagi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = selectedTheme =>
  StyleSheet.create({
    wrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 999,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Theme(selectedTheme).COLORS.LIGHT.s1,
    },
    text: {
      color: Theme(selectedTheme).COLORS.DARK.s3,
      fontSize: Theme(selectedTheme).FONT_SIZE.sm,
      marginTop: scaleWidth(3),
    },
    button: {
      backgroundColor: Theme(selectedTheme).COLORS.PRIMARY.s1,
      borderRadius: scaleWidth(1),
      paddingHorizontal: scaleWidth(3),
      paddingVertical: scaleWidth(1),
      marginTop: scaleWidth(3),
    },
    buttonText: {
      color: Theme(selectedTheme).COLORS.LIGHT.s1,
      fontSize: Theme(selectedTheme).FONT_SIZE.sm,
    },
  });
