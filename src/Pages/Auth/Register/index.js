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

export const AuthRegister = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [linkCodeReferral, setLinkCodeReferral] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pin, setPin] = useState('');

  const [securePassword, setSecurePassword] = useState(true);

  const navigation = useNavigation();

  const onRegister = async () => {
    try {
      const response = await Request.FPost(Url.API.AUTH.REGISTER, {
        username,
        name,
        no_hp: phone,
        password,
        confirm_password: confirmPassword,
        link_code_referral: linkCodeReferral,
        phone,
        pin,
      });

      if (response.success) {
        await AuthHelper.setAuthData(response.data);
        navigation.replace('app.auth.login-nasabah');
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
            <Text
              style={[
                styles.textLabel,
                {
                  fontSize: Theme().size.xl,
                },
              ]}>
              Mendaftar Akun Baru
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
              Lengkapi detail anda
            </Text>
          </View>

          <View
            style={{
              marginBottom: scaleHeight(14),
            }}
          />

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Email</Text>
            <View style={styles.rowDirection}>
              <View style={{flex: 1}}>
                <TextInput
                  value={username}
                  onChangeText={setUsername}
                  style={styles.formControl}
                  placeholderTextColor={Theme().color.secondary}
                  placeholder="Masukkan email"
                />
              </View>
              <View style={styles.iconControl}>
                <Icon
                  name="user"
                  size={25}
                  color={Theme().color.primary + '55'}
                />
              </View>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Nama</Text>
            <View style={styles.rowDirection}>
              <View style={{flex: 1}}>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  style={styles.formControl}
                  placeholderTextColor={Theme().color.secondary}
                  placeholder="Masukkan Nama"
                />
              </View>
              <View style={styles.iconControl}>
                <Icon
                  name="user"
                  size={25}
                  color={Theme().color.primary + '55'}
                />
              </View>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>No HP</Text>
            <View style={styles.rowDirection}>
              <View style={{flex: 1}}>
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  style={styles.formControl}
                  keyboardType="phone-pad"
                  placeholderTextColor={Theme().color.secondary}
                  placeholder="Masukkan No HP"
                />
              </View>
              <View style={styles.iconControl}>
                <Icon
                  name="phone"
                  size={25}
                  color={Theme().color.primary + '55'}
                />
              </View>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>PIN</Text>
            <View style={styles.rowDirection}>
              <View style={{flex: 1}}>
                <TextInput
                  value={pin}
                  onChangeText={setPin}
                  style={styles.formControl}
                  keyboardType="numeric"
                  secureTextEntry={true}
                  placeholderTextColor={Theme().color.secondary}
                  placeholder="Masukkan PIN"
                />
              </View>
              <View style={styles.iconControl}>
                <Icon
                  name="key"
                  size={25}
                  color={Theme().color.primary + '55'}
                />
              </View>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Password</Text>
            <View style={styles.rowDirection}>
              <View style={{flex: 1}}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  style={styles.formControl}
                  secureTextEntry={securePassword}
                  placeholderTextColor={Theme().color.secondary}
                  placeholder="Masukkan Password"
                />
              </View>
              <TouchableOpacity
                onPress={() => setSecurePassword(!securePassword)}
                style={styles.iconControl}>
                <Icon
                  name={securePassword ? 'eye-slash' : 'eye'}
                  size={25}
                  color={Theme().color.primary + '55'}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Konfirmasi Password</Text>
            <View style={styles.rowDirection}>
              <View style={{flex: 1}}>
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  style={styles.formControl}
                  secureTextEntry={securePassword}
                  placeholderTextColor={Theme().color.secondary}
                  placeholder="Konfirmasi Password Anda"
                />
              </View>
              <TouchableOpacity
                onPress={() => setSecurePassword(!securePassword)}
                style={styles.iconControl}>
                <Icon
                  name={securePassword ? 'eye-slash' : 'eye'}
                  size={25}
                  color={Theme().color.primary + '55'}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Kode Sobat ( OPSIONAL )</Text>
            <View style={styles.rowDirection}>
              <View style={{flex: 1}}>
                <TextInput
                  value={linkCodeReferral}
                  onChangeText={setLinkCodeReferral}
                  style={styles.formControl}
                  secureTextEntry={true}
                  placeholderTextColor={Theme().color.secondary}
                  placeholder="Masukkan Kode Sobat"
                />
              </View>
              <View style={styles.iconControl}>
                <Icon
                  name="asterisk"
                  size={25}
                  color={Theme().color.primary + '55'}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              // marginBottom: scaleHeight(5),
              flexDirection: 'column',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => onRegister()}
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
                Register
              </Text>
            </TouchableOpacity>
            <View
              style={{
                alignItems: 'center',
                marginTop: scaleHeight(1),
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: Theme().color.dark,
                  fontWeight: 'bold',
                  fontSize: Theme().size.xs,
                }}>
                By Continuing your confirm that you{'\n'} agree with
                <TouchableOpacity
                  onPress={() => {
                    navigation.push('app.webview', {
                      title: 'Term And Condition',
                      uri: Url.API.Info.TAC,
                    });
                  }}>
                  <Text
                    style={{
                      marginTop: scaleHeight(1),
                      textAlign: 'center',
                      color: Theme().color.primary,
                      fontWeight: 'bold',
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}>
                    {' '}
                    Term And Condition
                  </Text>
                </TouchableOpacity>{' '}
                and{' '}
                <TouchableOpacity
                  onPress={() => {
                    navigation.push('app.webview', {
                      title: 'Privacy Policy',
                      uri: Url.API.Info.PRIVACY_POLICY,
                    });
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: Theme().color.primary,
                      fontWeight: 'bold',
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}>
                    Privacy Policy
                  </Text>
                </TouchableOpacity>
              </Text>
            </View>
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
    color: '#444',
  },
  formGroup: {
    flexDirection: 'column',
    width: '100%',
    borderBottomColor: '#444',
    borderBottomWidth: 1,
    marginBottom: scaleHeight(3),
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
