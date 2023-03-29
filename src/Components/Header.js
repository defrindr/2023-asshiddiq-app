import React from 'react';
import Theme from '@styles/Theme';
import {scaleWidth} from '@utils/Size';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HeaderBottom from './HeaderBottom';

export default function Header({
  title = '',
  theme = 'light',
  onBackPress = () => {},
  rightComponent = null,
  leftComponent = null,
  withBottom = true,
}) {
  // substring title
  const limit = 75;

  let titleText = title;
  if (title.length > limit) {
    titleText = title.substring(0, limit) + '...';
  }

  return (
    <>
      <View style={Styles(theme).wrapper}>
        {leftComponent ? (
          leftComponent
        ) : (
          <TouchableOpacity
            activeOpacity={1}
            style={Styles(theme).backIconContainer}
            onPress={onBackPress}>
            <Icon
              name="arrow-left"
              size={scaleWidth(3)}
              color={Theme(theme).COLORS.LIGHT.s1}
            />
          </TouchableOpacity>
        )}
        <Text style={Styles(theme).title}>{titleText}</Text>
        {rightComponent}
      </View>
      {withBottom && <HeaderBottom />}
    </>
  );
}

const Styles = selectedTheme =>
  StyleSheet.create({
    wrapper: {
      backgroundColor: Theme(selectedTheme).COLOR.primary,
      // paddingVertical: scaleWidth(2),
      width: scaleWidth(100),
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      zIndex: 999,
    },
    backIconContainer: {
      alignItems: 'center',
      // backgroundColor: 'red',
      paddingVertical: scaleWidth(3.5),
      flex: 0.1,
    },
    title: {
      alignSelf: 'center',
      flex: 0.9,
      fontSize: scaleWidth(3.5),
      fontWeight: 'bold',
      color: Theme(selectedTheme).COLORS.LIGHT.s1,
    },
  });
