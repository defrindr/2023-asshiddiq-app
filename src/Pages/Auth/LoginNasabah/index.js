import { Alert, Image, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { scaleHeight, scaleWidth } from '../../../Utils/Size';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Theme from '../../../Styles/Theme';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Request from '../../../Utils/Request';
import Url from '../../../Config/Url';
import Toast from '../../../Utils/Toast';
import AuthHelper from '../../../Utils/AuthHelper';

export const AuthLoginNasabah = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [securePassword, setSecurePassword] = useState(true);

  const navigation = useNavigation();

  const onLogin = async () => {
    try {
      const response = await Request.FPost(Url.API.AUTH.LOGIN, {
        username,
        password,
      });

      if (response.success) {
        if (response.data.sobat == 1) {
          Toast.error('Login gagal', 'Silahkan Login Sebagai Sobat');
          return;
        }
        await AuthHelper.setAuthData(response.data);
        // let auth = await AuthHelper.getAuthData();
        navigation.replace('app.home');
        // navigation.reset();
      } else {
        Toast.error('Login Gagal', response.message);
      }
    } catch (error) {
      Toast.error('Login Gagal', 'Terjadi kesalahan saat mengirimkan data');
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Image
              source={require('../../../Assets/images/nasabah.png')}
              style={{
                width: scaleWidth(60),
                height: scaleWidth(60 / 2),
              }}
              resizeMode="contain"
            />
            <Text
              style={[
                styles.textLabel,
                {
                  fontSize: Theme().size.xl,
                },
              ]}>
              Halo Nasabah
            </Text>
            <Text
              style={[
                styles.textLabel,
                {
                  color: Theme().color.secondary,
                  fontWeight: 'normal',
                  fontSize: Theme().size.xs,
                },
              ]}>
              Masuk dengan menggunakan email dan password
            </Text>
          </View>

          <View
            style={{
              marginBottom: scaleHeight(14),
            }}
          />

          <View
            style={{
              // marginBottom: scaleHeight(5),
              flexDirection: 'column',
              width: '100%',
              borderBottomColor: '#000',
              borderBottomWidth: 1,
              marginBottom: scaleHeight(3),
            }}>
            <Text
              style={{
                color: Theme().color.secondary,
                fontSize: Theme().size.xs,
                paddingStart: scaleWidth(1),
              }}>
              Email
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                }}>
                <TextInput
                  onChangeText={setUsername}
                  style={{
                    color: Theme().color.secondary,
                    fontSize: Theme().size.s,
                    padding: scaleHeight(0.5),
                    paddingHorizontal: scaleWidth(1),
                    paddingTop: scaleHeight(0.2),
                  }}
                  placeholderTextColor={Theme().color.secondary}
                  placeholder="Masukkan email anda"
                />
              </View>
              <View
                style={{
                  flex: 0.1,
                  alignItems: 'flex-end',
                }}>
                <Icon name="user" size={25} color="#000" />
              </View>
            </View>
          </View>

          <View
            style={{
              // marginBottom: scaleHeight(5),
              flexDirection: 'column',
              width: '100%',
              borderBottomColor: '#000',
              borderBottomWidth: 1,
              marginBottom: scaleHeight(3),
            }}>
            <Text
              style={{
                color: Theme().color.secondary,
                fontSize: Theme().size.xs,
                paddingStart: scaleWidth(1),
              }}>
              Password
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                }}>
                <TextInput
                  onChangeText={setPassword}
                  placeholderTextColor={Theme().color.secondary}
                  style={{
                    color: Theme().color.secondary,
                    fontSize: Theme().size.s,
                    padding: scaleHeight(0.5),
                    paddingHorizontal: scaleWidth(1),
                    paddingTop: scaleHeight(0.2),
                  }}
                  secureTextEntry={securePassword}
                  placeholder="Masukkan password anda"
                />
              </View>
              <TouchableOpacity
                onPress={() => setSecurePassword(!securePassword)}
                activeOpacity={0.8}
                style={{
                  flex: 0.1,
                  alignItems: 'flex-end',
                }}>
                <Icon
                  name={securePassword ? 'eye-slash' : 'eye'}
                  size={20}
                  color="#000"
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
              onPress={() => onLogin()}
              style={{
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
                  color: Theme().color.secondary,
                  fontWeight: 'bold',
                  fontSize: Theme().size.s,
                  paddingStart: scaleWidth(1),
                }}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('app.auth.register')}
              style={{
                marginTop: scaleHeight(1),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Theme().color.primary,
                padding: scaleHeight(1),
                borderRadius: scaleHeight(1),
                borderWidth: 1.5,
                borderColor: Theme().color.primary,
              }}>
              <Text
                style={{
                  color: Theme().color.white,
                  fontWeight: 'bold',
                  fontSize: Theme().size.s,
                  paddingStart: scaleWidth(1),
                }}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: scaleHeight(100),
    padding: scaleHeight(5),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
});
