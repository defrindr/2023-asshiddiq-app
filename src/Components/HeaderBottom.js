import Theme from '@styles/Theme';
import {HEADER_HEIGHT, scaleHeight, scaleWidth} from '@utils/Size';
import React from 'react';
import {ImageBackground} from 'react-native';

const HeaderBottom = ({children}) => {
  return (
    <>
      <ImageBackground
        source={require('@assets/images/header/navbar.png')}
        imageStyle={{
          resizeMode: 'stretch',
          alignSelf: 'flex-end',
        }}
        style={{
          width: '100%',
          height: scaleWidth(15),
          position: 'absolute',
          top: scaleWidth(15) - scaleWidth(15 / 2.5),
        }}
      />
    </>
  );
};

export default HeaderBottom;
