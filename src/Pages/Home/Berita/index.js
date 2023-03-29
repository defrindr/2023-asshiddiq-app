import {Alert, Image, ScrollView, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {scaleHeight, scaleWidth} from '../../../Utils/Size';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Theme from '../../../Styles/Theme';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Request from '../../../Utils/Request';
import Url from '../../../Config/Url';
import Toast from '../../../Utils/Toast';
import AuthHelper from '../../../Utils/AuthHelper';
import Color from '../../../Styles/Color';

export const Berita = () => {
  const navigation = useNavigation();
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    getBerita();
  }, []);

  const getBerita = async () => {
    try {
      const response = await Request.FGetWA(Url.API.BERITA.ALL);

      if (response.success) {
        setBerita(response.data);
      } else {
        Toast.error('Berita', response.message);
      }
    } catch (error) {
      console.log(error);
      Toast.error('Berita', 'Terjadi kesalahan saat mengirimkan data');
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {berita &&
            berita.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.berita]}
                onPress={() => {
                  navigation.push('app.berita.detail', {
                    id: item.id,
                  });
                }}>
                <View style={[styles.imageContainer]}>
                  <Image
                    source={{uri: item.gambar}}
                    resizeMode="cover"
                    style={styles.image}
                  />
                </View>
                <View style={styles.body}>
                  <Text style={styles.title}>{item.judul}</Text>
                  <Text style={styles.datetime}>{item.created_at}</Text>
                </View>
              </TouchableOpacity>
            ))}
          {berita.length == 0 && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '80%',
              }}>
              <Image
                source={require('@assets/images/no-content.png')}
                style={{
                  width: '100%',
                  height: scaleHeight(35),
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: scaleWidth(5),
                  fontWeight: 'bold',
                  color: Color.lightMode.primary,
                }}>
                Berita Kosong
              </Text>
            </View>
          )}
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
  berita: {
    flexDirection: 'row',
    marginBottom: scaleHeight(1),
  },
  imageContainer: {
    flex: 0.2,
    width: scaleWidth(18),
    height: scaleWidth(18),
    overflow: 'hidden',
    borderRadius: scaleWidth(3),
    marginRight: scaleWidth(1),
  },
  image: {
    width: scaleWidth(18),
    height: scaleWidth(18),
    borderRadius: scaleWidth(3),
    borderWidth: scaleWidth(0.1),
    borderColor: Theme().color.secondary,
  },
  body: {
    flex: 0.8,
    flexDirection: 'column',
  },
  title: {
    fontSize: Theme().size.s,
    color: Theme().colors.lightMode.secondary,
  },
  datetime: {
    fontSize: Theme().size.xs / 1.2,
    color: Theme().colors.lightMode.secondary + '99',
  },
});
