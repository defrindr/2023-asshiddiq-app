import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {Dimensions, StyleSheet, useColorScheme} from 'react-native';
import WebView from 'react-native-webview';
import Header from '../../Components/Header';
import LoadingPage from '../../Components/LoadingPage';
import NotFound from '../../Components/NotFound';

export default function Webview() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const theme = useColorScheme();
  const route = useRoute();
  const {uri} = route.params;

  return (
    <>
      <WebView
        source={{uri: uri}}
        onLoadStart={() => {
          setLoading(true);
        }}
        onLoadEnd={() => {
          setLoading(false);
        }}
        style={Styles(theme).maxWidth}
        javaScriptEnabled={true}
      />
    </>
  );
}

const Styles = theme =>
  StyleSheet.create({
    maxWidth: {
      width: '100%',
      // minHeight: scaleHeight(85)
    },
  });
