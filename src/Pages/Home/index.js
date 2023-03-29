import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useHome from './useHome';
import Devotion from './Devotion';
import Header from './Header';
import Menu from './Menu';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import Theme from '../../Styles/Theme';
import Carousel from '../../Components/Carousel';
import { scaleHeight, scaleWidth } from '../../Utils/Size';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import WebView from 'react-native-webview';
import Request from '../../Utils/Request';
import Url from '../../Config/Url';
import Toast from '../../Utils/Toast';

export default function Home() {
  const theme = useColorScheme();
  const navigation = useNavigation();
  const [resfresing, setResfresing] = useState(false);

  const menus = [
    {
      id: 1,
      name: 'Simpanan Umroh',
      icon: 'wallet',
      action: () => { },
    },
    {
      id: 2,
      name: 'Investasi',
      icon: 'coins',
      action: () => { },
    },
    {
      id: 3,
      name: 'Refferal',
      icon: 'shopping-cart',
      action: () => { },
    },
    {
      id: 4,
      name: 'Berita',
      icon: 'newspaper',
      action: () => { },
    },
  ];

  const [data, setData] = useState({
    banner: [],
    notification: 0,
    youtube_link: null,
  });

  const onFirstInit = async () => {
    try {
      const response = await Request.FGetWA(Url.API.HOME.INDEX);
      console.log(response);
      if (response.success) {
        setData(() => response.data);
      } else {
        Toast.error('Gagal Memuat', response.message);
      }
    } catch (error) {
      Toast.error('Gagal Memuat', 'Gagal meminta data dari server');
    }
  };

  useEffect(() => {
    onFirstInit();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Theme(theme).color.neutral,
      }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={resfresing} onRefresh={() => {
            onFirstInit();
          }} />
        }
        style={{
          backgroundColor: Theme(theme).color.neutral,
        }}>
        <Header
          theme={theme}
          data={{
            notification: data.notification,
          }}
          onPressNotification={() => {
            navigation.push('app.notification');
          }}
        />
        <Menu theme={theme} />

        <View>
          <Text
            style={{
              fontSize: Theme().size.m,
              fontWeight: 'bold',
              color: Theme(theme).color.black,
              marginHorizontal: scaleWidth(3.5),
              marginTop: scaleHeight(2),
              paddingBottom: scaleHeight(1),
            }}
          />
          <Carousel
            items={data.banner}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.8}
                  onPress={() => {
                    if (item.uri) {
                      Linking.openURL(item.uri);
                    }
                  }}
                  style={{
                    width: scaleWidth(94),
                    height: scaleHeight(30),
                    marginHorizontal: scaleWidth(2),
                  }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: '100%',
                      height: scaleHeight(30),
                      borderRadius: 10,
                      backgroundColor: Theme(theme).color.secondary,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View
          style={{
            height: scaleHeight(5),
          }}
        />
        <View>
          <Text
            style={{
              fontSize: Theme().size.m,
              fontWeight: 'bold',
              color: Theme(theme).color.black,
              marginHorizontal: scaleWidth(3.5),
              marginTop: scaleHeight(2),
              paddingBottom: scaleHeight(1),
            }}>
            Siapa Kami
          </Text>
          <View style={{ padding: scaleWidth(3) }}>
            <WebView
              source={{ uri: data.youtube_link }}
              style={{
                width: '100%',
                borderRadius: scaleWidth(4),
                height: scaleHeight(35),
                backgroundColor: Theme().color.secondary,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
