import {useNavigation} from '@react-navigation/native';
import Layout from '@styles/Layout';
import Theme from '@styles/Theme';
import {useCallback, useEffect} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  View,
  useColorScheme,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Logo from './Logo';
import Title from './Title';
import LinearGradient from 'react-native-linear-gradient';
import AuthHelper from '../../../Utils/AuthHelper';

const SplashScreen = () => {
  const theme = useColorScheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const redirectAfterWaiting = useCallback(async () => {
    // waiting for 3 seconds
    let isLogin = await AuthHelper.isLogin();
    setTimeout(() => {
      if (isLogin) {
        navigation.replace('app.home');
      } else {
        navigation.replace('app.auth.chooselogin');
      }
    }, 3000);
  }, [navigation]);

  useEffect(() => {
    redirectAfterWaiting();
  }, [redirectAfterWaiting]);

  return (
    <SafeAreaView>
      <View style={[Layout().container]}>
        <ImageBackground
          source={require('@assets/images/splashscreen.png')}
          imageStyle={{
            resizeMode: 'cover',
          }}
          blurRadius={1}
          style={[
            Layout().justifyContentCenter,
            Layout().alignItemsCenter,
            Layout().bgColor(Theme(theme).color.neutral),
            {
              height: '100%',
              width: '100%',
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
            },
          ]}
        />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
