import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import messaging from '@react-native-firebase/messaging';

import SplashScreen from '@pages/Init/SplashScreen';
import Home from '@pages/Home';
import ThemeContext from '@context/ThemeContext';
import { useContext } from 'react';
import Theme from '@styles/Theme';
import HomeTabBar from './HomeTabBar';
import { Image } from 'react-native';
import { scaleWidth } from '../Utils/Size';
import Transfer from '../Pages/Transfer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Profile from '../Pages/Profile';
import { AuthRegister } from '../Pages/Auth/Register';
import Webview from '../Pages/Webview';
import { UbahProfile } from '../Pages/Profile/UbahProfile';
import { UbahPin } from '../Pages/Profile/UbahPin';
import { UbahPassword } from '../Pages/Profile/UbahPassword';
import { Berita } from '../Pages/Home/Berita';
import { BeritaDetail } from '../Pages/Home/BeritaDetail';
import Tabungan from '../Pages/Tabungan';
import TambahTabungan from '../Pages/Tabungan/Tambah';
import TabunganDetail from '../Pages/Tabungan/Detail';
import Investasi from '../Pages/Investasi';
import { KodePromo } from '../Pages/Profile/KodePromo';
import { Referral } from '../Pages/Profile/Referral';
import { Notification } from '../Pages/Notification';
import Renderhtml from '../Pages/Renderhtml';
import TambahInvestasi from '../Pages/Investasi/Tambah';
import InvestasiDetail from '../Pages/Investasi/Detail';
import InvestasiList from '../Pages/Investasi/List';
import Download from '../Pages/Home/Download';
import { navigationRef } from '../Context/RootNavigation';
import { AuthChooseLogin } from '../Pages/Auth/Chooselogin';
import { AuthLoginNasabah } from '../Pages/Auth/LoginNasabah';
import { AuthLoginSobat } from '../Pages/Auth/LoginSobat';
import { Gaji } from '../Pages/Profile/Gaji';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Handle Messaging Background
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  const { data } = remoteMessage;

  try {
    // Actions.push(data.route, JSON.parse(data.params));
  } catch (error) {
    console.log(Toast);
  }
});

// on notification click
messaging().onNotificationOpenedApp(remoteMessage => {
  const { data } = remoteMessage;
  console.log('Notification caused app to open from background state:', data);
  // Actions.push(data.route, JSON.parse(data.params));
});

const HomeTab = () => {
  const MyIconStyle = (size, focused, color) => {
    return {
      width: size,
      height: size,
      marginBottom: scaleWidth(2),
      // gray filter if not focused
      tintColor: color,
    };
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: Theme().color.primary,
      }}
      tabBar={props => {
        return <HomeTabBar {...props} />;
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ size, focused, color }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
        name="app.hometab-home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Transfer',
          tabBarIcon: ({ size, focused, color }) => {
            return <Icon name="exchange-alt" size={size} color={color} />;
          },
        }}
        name="app.hometab-transfer"
        component={Transfer}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ size, focused, color }) => {
            return <Icon name="user" size={size} color={color} />;
          },
        }}
        name="app.hometab-profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

const Routes = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="app.init">
        <Stack.Screen
          options={{ headerShown: false }}
          name="app.auth.login-nasabah"
          component={AuthLoginNasabah}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="app.auth.login-sobat"
          component={AuthLoginSobat}
        />
        <Stack.Screen
          options={{
            title: 'Register',
            headerStyle: {
              backgroundColor: '#6017bf',
            },
            headerTintColor: '#fff',
          }}
          name="app.auth.register"
          component={AuthRegister}
        />
        <Stack.Screen
          options={{
            title: 'Ubah Profile',
            headerStyle: {
              backgroundColor: '#6017bf',
            },
            headerTintColor: '#fff',
          }}
          name="app.profile.ubah-profile"
          component={UbahProfile}
        />
        <Stack.Screen
          options={{
            title: 'Ubah Pin',
            headerStyle: {
              backgroundColor: '#6017bf',
            },
            headerTintColor: '#fff',
          }}
          name="app.profile.ubah-pin"
          component={UbahPin}
        />
        <Stack.Screen
          options={{
            title: 'Ganti Password',
            headerStyle: {
              backgroundColor: '#6017bf',
            },
            headerTintColor: '#fff',
          }}
          name="app.profile.ubah-password"
          component={UbahPassword}
        />

        <Stack.Screen
          options={{
            title: 'Kode Promo',
            headerStyle: {
              backgroundColor: '#6017bf',
            },
            headerTintColor: '#fff',
          }}
          name="app.profile.kode-promo"
          component={KodePromo}
        />

        <Stack.Screen
          options={{
            title: 'Gaji plus',
            headerStyle: {
              backgroundColor: '#6017bf',
            },
            headerTintColor: '#fff',
          }}
          name="app.profile.gaji"
          component={Gaji}
        />

        <Stack.Screen
          options={{
            title: 'Daftar Sobat',
            headerStyle: {
              backgroundColor: '#6017bf',
            },
            headerTintColor: '#fff',
          }}
          name="app.profile.referral"
          component={Referral}
        />

        <Stack.Screen
          options={{
            title: 'Notifikasi',
            headerStyle: {
              backgroundColor: '#6017bf',
            },
            headerTintColor: '#fff',
          }}
          name="app.notification"
          component={Notification}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="app.auth.chooselogin"
          component={AuthChooseLogin}
        />

        <Stack.Screen
          options={{
            title: 'Download File',
            headerStyle: {
              backgroundColor: '#6017bf',
            },
            headerTintColor: '#fff',
          }}
          name="app.download"
          component={Download}
        />

        <Stack.Screen
          options={{
            title: 'Berita',
            headerStyle: {
              backgroundColor: '#6017bf',
            },
            headerTintColor: '#fff',
          }}
          name="app.berita"
          component={Berita}
        />
        <Stack.Screen
          options={{
            title: 'Detail Berita',
            headerStyle: {
              backgroundColor: '#6017bf',
            },
            headerTintColor: '#fff',
          }}
          name="app.berita.detail"
          component={BeritaDetail}
        />

        {/* Tabungan */}

        <Stack.Screen
          options={{
            title: 'Simpanan Umroh',
            headerStyle: {
              backgroundColor: '#6017bf',
            },
            headerTintColor: '#fff',
          }}
          name="app.tabungan"
          component={Tabungan}
        />
        <Stack.Screen
          options={{
            title: 'Detail Transaksi',
            headerStyle: {
              backgroundColor: '#6017bf',
            },
            headerTintColor: '#fff',
          }}
          name="app.tabungan.detail"
          component={TabunganDetail}
        />

        <Stack.Screen
          options={{
            title: 'Tambah Simpanan',
            headerStyle: {
              backgroundColor: '#6017bf',
            },
            headerTintColor: '#fff',
          }}
          name="app.tabungan.tambah"
          component={TambahTabungan}
        />
        {/* end tabungan */}

        {/* Investasi */}

        <Stack.Screen
          options={{
            title: 'Investasi',
            headerStyle: {
              backgroundColor: '#6017bf',
            },
            headerTintColor: '#fff',
          }}
          name="app.investasi"
          component={Investasi}
        />

        <Stack.Screen
          options={{
            title: 'Jenis Investasi',
            headerStyle: {
              backgroundColor: '#6017bf',
            },
            headerTintColor: '#fff',
          }}
          name="app.investasi.list"
          component={InvestasiList}
        />
        <Stack.Screen
          options={{
            title: 'Detail Investasi',
            headerStyle: {
              backgroundColor: '#6017bf',
            },
            headerTintColor: '#fff',
          }}
          name="app.investasi.detail"
          component={InvestasiDetail}
        />

        <Stack.Screen
          options={{
            title: 'Tambah Investasi',
            headerStyle: {
              backgroundColor: '#6017bf',
            },
            headerTintColor: '#fff',
          }}
          name="app.investasi.tambah"
          component={TambahInvestasi}
        />

        {/* end investasi */}

        <Stack.Screen
          options={({ route }) => ({
            title: route.params.title,
            headerStyle: {
              backgroundColor: '#6017bf',
            },
            headerTintColor: '#fff',
          })}
          name="app.webview"
          component={Webview}
        />
        <Stack.Screen
          options={({ route }) => ({
            title: route.params.title,
            headerStyle: {
              backgroundColor: '#6017bf',
            },
            headerTintColor: '#fff',
          })}
          name="app.renderhtml"
          component={Renderhtml}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="app.init"
          component={SplashScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="app.home"
          component={HomeTab}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
