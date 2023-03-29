import {Alert, Image, ScrollView, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {scaleHeight, scaleWidth} from '../../../Utils/Size';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Theme from '../../../Styles/Theme';
import {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Request from '../../../Utils/Request';
import Url from '../../../Config/Url';
import Toast from '../../../Utils/Toast';
import AuthHelper from '../../../Utils/AuthHelper';
import WebView from 'react-native-webview';
import RenderHTML from 'react-native-render-html';

export const BeritaDetail = () => {
  const navigation = useNavigation();
  const [berita, setBerita] = useState([]);
  const route = useRoute();
  let {id = 0} = route.params;

  useEffect(() => {
    getBerita();
  }, []);

  const getBerita = async () => {
    if (id === 0) {
      Toast.error('Gagal', 'Berita tidak ditemukan');
      navigation.pop();
    }
    try {
      const response = await Request.FGetWA(Url.API.BERITA.DETAIL + id);

      if (response.success) {
        setBerita(response.data);
      } else {
        Toast.error('Berita', response.message);
        navigation.pop();
      }
    } catch (error) {
      console.log(error);
      Toast.error('Berita', 'Terjadi kesalahan saat mengirimkan data');
      navigation.pop();
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.containerImage}>
            <Image
              source={{uri: berita.gambar}}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
          <View style={styles.header}>
            <Text style={styles.textTitle}>{berita.judul}</Text>
            <View style={styles.detailHeader}>
              <View style={styles.detailHeaderItem}>
                <Icon name={'calendar'} style={styles.detailHeaderIcon} />
                <Text style={styles.detailHeaderValue}>
                  {berita.created_at}
                </Text>
              </View>
              <View style={styles.detailHeaderItem}>
                <Icon name={'eye'} style={styles.detailHeaderIcon} />
                <Text style={styles.detailHeaderValue}>{berita.dilihat}</Text>
              </View>
            </View>
          </View>
          <View style={styles.body}>
            <RenderHTML
              source={{
                html: berita.isi,
              }}
              contentWidth={scaleWidth(100)}
              tagsStyles={{
                body: {
                  minWidth: '100%',
                  whiteSpace: 'normal',
                  color: Theme().color.secondary,
                },
                a: {
                  color: Theme().color.primary,
                },
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    minHeight: scaleHeight(100),
    paddingHorizontal: scaleHeight(2),
    paddingVertical: scaleHeight(2),
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  containerImage: {
    width: '100%',
    height: scaleHeight(30),
  },
  image: {
    width: '100%',
    height: scaleHeight(30),
  },
  header: {
    width: '100%',
    marginVertical: scaleHeight(2),
    // backgroundColor:'red',
  },
  textTitle: {
    fontSize: Theme().size.m,
    color: Theme().color.dark,
  },
  detailHeader: {
    flexDirection: 'row',
    marginTop: scaleHeight(1),
  },
  detailHeaderItem: {
    flexDirection: 'row',
    marginEnd: scaleWidth(3),
  },
  detailHeaderIcon: {
    color: Theme().color.secondary,
    marginEnd: scaleWidth(1),
  },
  detailHeaderValue: {
    color: Theme().color.secondary,
  },
});
