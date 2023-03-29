import {Alert, ScrollView, TextInput} from 'react-native';
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

export const UbahPin = () => {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');

  const [securePassword, setSecurePassword] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const response = await Request.FGetWA(Url.API.PROFILE.VIEW);
      if (response.success) {
        let user = response.data;
        // setUsername(user.username);
        // setPin(user.pin);
      } else {
        Toast.error('Get User', response.message);
        // navigation.pop();
      }
    } catch (error) {
      console.log(error);
      Toast.error('Get User', 'Terjadi kesalahan saat mengirimkan data');
      // navigation.pop();
    }
  };

  const onUpdatePin = async () => {
    try {
      const response = await Request.FPostWA(Url.API.PROFILE.UPDATE, {
        pin,
      });

      if (response.success) {
        Toast.success('Pin Berhasil diubah', response.message);
        navigation.goBack();
      } else {
        Toast.error('Pin Gagal Diubah', response.message);
      }
    } catch (error) {
      Toast.error(
        'Pin Gagal Diubah',
        'Terjadi kesalahan saat mengirimkan data',
      );
    }
  };

  return (
    <SafeAreaView>
      {/* <ScrollView> */}
      <View style={styles.container}>
        <View
          style={[
            styles.formGroup,
            {
              // backgroundColor: Theme().color.secondary + '22',
            },
          ]}>
          <Text style={styles.formLabel}>Masukkan PIN baru</Text>
          <View style={styles.rowDirection}>
            <View style={{flex: 1}}>
              <TextInput
                value={pin}
                onChangeText={setPin}
                style={[styles.formControl]}
                secureTextEntry={securePassword}
                keyboardType="number-pad"
                placeholderTextColor={Theme().color.secondary}
                placeholder="Enter your new PIN"
              />
            </View>
            <TouchableOpacity
              style={styles.iconControl}
              onPress={() => setSecurePassword(!securePassword)}>
              <Icon
                name={securePassword ? 'eye-slash' : 'eye'}
                size={25}
                color={Theme().color.primary + '55'}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            // marginBottom: scaleHeight(5),
            flexDirection: 'column',
            width: '100%',
          }}>
          <TouchableOpacity
            onPress={() => onUpdatePin()}
            style={{
              marginTop: scaleHeight(1),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Theme().color.white,
              padding: scaleHeight(1),
              borderRadius: scaleHeight(1),
              borderWidth: 1.5,
              borderColor: Theme().color.primary,
            }}>
            <Text
              style={{
                color: Theme().color.primary,
                fontWeight: 'bold',
                fontSize: Theme().size.s,
                paddingStart: scaleWidth(1),
              }}>
              Ubah Pin
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    minHeight: scaleHeight(100),
    paddingHorizontal: scaleHeight(2),
    paddingVertical: scaleHeight(5),
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  textLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#444',
  },
  formGroup: {
    flexDirection: 'column',
    width: '100%',
    borderBottomColor: '#444',
    borderBottomWidth: 1,
    marginBottom: scaleHeight(3),
    padding: scaleHeight(0.5),
  },
  rowDirection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formLabel: {
    color: Theme().color.secondary,
    fontSize: Theme().size.xs,
    paddingStart: scaleWidth(1),
  },
  formControl: {
    color: Theme().color.secondary,
    fontSize: Theme().size.s,
    padding: scaleHeight(0.5),
    paddingHorizontal: scaleWidth(1),
    paddingTop: scaleHeight(0.2),
  },
  iconControl: {
    flex: 0.1,
    alignItems: 'flex-end',
  },
});
