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
import LinearGradient from 'react-native-linear-gradient';
import Formatter from '../../../Utils/Formatter';

export const KodePromo = () => {
  const [user, setUser] = useState({
    code_referral: '',
  });
  const navigation = useNavigation();
  const [infoMax, setInfoMax] = useState({
    'max-komisi': 0,
  });

  useEffect(() => {
    getUserData();
    onFirstInit();
  }, []);

  const onFirstInit = async () => {
    try {
      const response = await Request.FGetWA(Url.API.INVESTASI.MAXIMUM);
      if (response.success) {
        setInfoMax(response.data);
      } else {
        Toast.error('Gagal', response.message);
      }
    } catch (error) {
      Toast.error('Request Gagal', 'Gagal mengambil data dari server');
    }
  };

  const getUserData = async () => {
    try {
      const response = await Request.FGetWA(Url.API.PROFILE.VIEW);
      if (response.success) {
        let user = response.data;
        console.log(response.data);
        setUser(response.data);
      } else {
        Toast.error('Update gagal', response.message);
        // navigation.pop();
      }
    } catch (error) {
      console.log(error);
      Toast.error('Update gagal', 'Terjadi kesalahan saat mengirimkan data');
      // navigation.pop();
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <LinearGradient
            style={styles.background}
            colors={[Theme().color.primary, Theme().color.neutral]}
          />
          <View style={styles.box}>
            <Image
              resizeMode="contain"
              style={{
                width: '100%',
                height: scaleHeight(25),
              }}
              source={require('../../../Assets/images/refferal.png')}
            />
            <Text
              style={{
                fontSize: Theme().size.m,
                fontWeight: 'bold',
                textAlign: 'center',
                color: Theme().color.secondary,
                marginBottom: scaleHeight(5),
              }}>
              Ajak teman anda menabung dan ber Investasi bersama kami dan
              dapatkan hadiah menarik
            </Text>

            <Text
              style={{
                fontSize: Theme().size.sm,
                textAlign: 'center',
                color: Theme().color.secondary,
              }}>
              Masukan kode member anda {'\n'}
              Pada saat mendaftarkan member baru
            </Text>
            {user.code_referral && (
              <Text
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: Theme().color.primary,
                  marginBottom: scaleHeight(5),
                  padding: scaleHeight(2),
                  fontSize: Theme().size.xl,
                }}>
                {user.code_referral}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    // backgroundColor: Theme().color.primary,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    // zIndex: 999999,
    height: scaleHeight(30),
  },
  container: {
    // flex: 1,
    minHeight: scaleHeight(100),
    backgroundColor: Theme().color.neutral,
    // paddingHorizontal: scaleHeight(2),
    // paddingVertical: scaleHeight(5),
    alignItems: 'center',
    // justifyContent: 'center',
  },
  box: {
    width: '95%',
    marginTop: scaleHeight(5),
    borderRadius: scaleWidth(5),
    borderColor: Theme().color.secondary + 'AA',
    borderWidth: scaleWidth(0.1),
    minHeight: scaleHeight(50),
    backgroundColor: Theme().color.neutral,
    padding: scaleHeight(5),
    paddingHorizontal: scaleWidth(5),
  },
});
