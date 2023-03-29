import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {Dimensions, StyleSheet, useColorScheme} from 'react-native';
import WebView from 'react-native-webview';
import Header from '../../Components/Header';
import LoadingPage from '../../Components/LoadingPage';
import NotFound from '../../Components/NotFound';
import RenderHTML from 'react-native-render-html';
import {scaleWidth} from '../../Utils/Size';
import Theme from '../../Styles/Theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';

export default function Renderhtml() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const theme = useColorScheme();
  const route = useRoute();
  const {uri} = route.params;

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <RenderHTML
            source={{uri: uri}}
            contentWidth={scaleWidth(100)}
            tagsStyles={{
              body: {
                minWidth: '100%',
                padding: scaleWidth(2),
                whiteSpace: 'normal',
                color: Theme().color.secondary,
                backgroundColor: Theme().color.neutral,
              },
              a: {
                color: Theme().color.primary,
              },
            }}
          />
        </ScrollView>
      </SafeAreaView>
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
