import Theme from '@styles/Theme';
import {scaleWidth} from '@utils/Size';
import {Image, StyleSheet, Text, View} from 'react-native';

export default function LoadingPage({theme = 'light', ...props}) {
  return (
    <View style={styles(theme).wrapper} {...props}>
      <Image
        source={require('@assets/images/loading.gif')}
        style={styles(theme).image}
      />
      <Text style={styles(theme).text}>Loading...</Text>
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
      backgroundColor: Theme(selectedTheme).COLORS.LIGHT.s1 + '00',
    },
    image: {
      width: scaleWidth(15),
      height: scaleWidth(7.5),
    },
    text: {
      color: Theme(selectedTheme).COLORS.DARK.s3,
      fontSize: Theme(selectedTheme).FONT_SIZE.sm,
      marginTop: scaleWidth(3),
    },
  });
