import {
  Image,
  Linking,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import Theme from '../../Styles/Theme';
import {scaleHeight, scaleWidth} from '../../Utils/Size';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AuthHelper from '../../Utils/AuthHelper';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import Request from '../../Utils/Request';
import Toast from '../../Utils/Toast';
import Url from '../../Config/Url';

export default function Profile() {
  const theme = useColorScheme();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: 'Unknown User',
    nomor_handphone: '-',
    is_premium: false,
    qr_code: 'https://placeholder.com/100x100?text=DARBECARD',
  });
  const [setting, setSetting] = useState({
    menus: [],
  });

  useEffect(() => {
    onFirstInit();
    getUserData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await getUserData();
    });

    return unsubscribe;
  }, [navigation]);

  const onFirstInit = async () => {
    try {
      const response = await Request.FGetWA(Url.API.PROFILE.SETTING);
      if (response.success) {
        console.log(response.data);
        setSetting(response.data);
      } else {
        Toast.error('Profile', response.message);
      }
    } catch (error) {
      Toast.error('Profile', 'Terjadi kesalahan saat mengirimkan data');
      // navigation.pop();
    }
  };
  const getUserData = async () => {
    try {
      const response = await Request.FGetWA(Url.API.PROFILE.VIEW);
      if (response.success) {
        // console.log(response.data);
        setUser(response.data);
      } else {
        Toast.error('Profile', response.message);
      }
    } catch (error) {
      console.log(error);
      Toast.error('Profile', 'Terjadi kesalahan saat mengirimkan data');
      // navigation.pop();
    }
  };

  const actionLogout = async () => {
    await AuthHelper.removeAuthData();
    // navigation.reset("app.auth.login")
    navigation.replace('app.auth.chooselogin');
  };

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={async () => await onFirstInit()}
          />
        }>
        <View
          style={{
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: Theme(theme).color.neutral,
          }}>
          <View
            style={{
              width: '100%',
              padding: scaleWidth(1.5),
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: scaleHeight(1),
            }}>
            {/* <Text style={{
              fontSize: Theme(theme).size.m,
              fontWeight: 'bold',
              color: Theme(theme).color.secondary,
              alignSelf: 'flex-start',
            }}>Profile</Text> */}
          </View>

          <View
            style={{
              margin: scaleWidth(3),
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                padding: scaleWidth(1.5),
                borderBottomColor: Theme(theme).color.secondary,
                borderBottomWidth: scaleWidth(0.1),
              }}>
              <View
                style={{
                  flex: 0.1,
                  alignItems: 'center',
                }}>
                <Icon
                  name="user"
                  size={scaleWidth(7)}
                  color={Theme(theme).color.primary}
                />
              </View>
              <View
                style={{
                  flex: 0.9,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontSize: Theme(theme).size.s,
                      fontWeight: 'bold',
                      color: Theme(theme).color.black,
                    }}>
                    {user.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: Theme(theme).size.s,
                      color: Theme(theme).color.secondary,
                    }}>
                    {user.nomor_handphone}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'column',
                padding: scaleWidth(1.5),
                borderBottomColor: Theme(theme).color.secondary,
                borderBottomWidth: scaleWidth(0.1),
              }}>
              <Text
                style={{
                  fontSize: Theme(theme).size.s,
                  fontWeight: 'bold',
                  color: Theme(theme).color.black,
                  paddingBottom: scaleHeight(1),
                }}>
                As-Shiddiq Card
              </Text>
              <View
                style={{
                  padding: scaleWidth(1.5),
                  borderRadius: scaleWidth(1),
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: user.qr_code}}
                  style={{
                    width: scaleWidth(65),
                    height: scaleHeight(20),
                    borderRadius: scaleWidth(4),
                    backgroundColor: Theme(theme).color.secondary,
                  }}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        </View>

        {setting.menus &&
          setting.menus.map((menu, index) => {
            return (
              <View
                key={index}
                style={{
                  padding: scaleWidth(3),
                  backgroundColor: Theme(theme).color.neutral,
                  marginBottom: scaleHeight(1),
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    padding: scaleWidth(1.5),
                  }}>
                  <Text
                    style={{
                      fontSize: Theme(theme).size.s,
                      fontWeight: 'bold',
                      color: Theme(theme).color.black,
                      paddingBottom: scaleHeight(1),
                    }}>
                    {menu.title}
                  </Text>
                  {menu.children
                    .filter(item => item.visible)
                    .map((child, index) => {
                      return (
                        <TouchableOpacity
                          onPress={async () => {
                            try {
                              const action = child.action;
                              if (action.type === 'navigation') {
                                navigation.push(
                                  action.name,
                                  action.params ?? {},
                                );
                              } else if (action.type == 'linking') {
                                Linking.openURL(action.name);
                              } else if (action.type == 'function') {
                                let func = action.name;
                                if (func == 'logout') {
                                  actionLogout();
                                }
                              }
                            } catch (error) {
                              console.log(error);
                            }
                          }}
                          key={index}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            padding: scaleWidth(1.5),
                            borderBottomColor: Theme(theme).color.secondary,
                            borderBottomWidth: scaleWidth(0.1),
                          }}>
                          <Text
                            style={{
                              fontSize: Theme(theme).size.s,
                              color: Theme(theme).color.black,
                            }}>
                            {child.title}
                          </Text>
                          <View
                            style={{
                              backgroundColor: Theme(theme).color.primary,
                              borderRadius: scaleWidth(100),
                              width: scaleWidth(5),
                              height: scaleWidth(5),
                              paddingHorizontal: scaleWidth(2),
                              alignItems: 'center',
                              justifyContent: 'center',
                              overflow: 'hidden',
                            }}>
                            <Icon
                              name="chevron-right"
                              size={scaleWidth(2)}
                              color={Theme(theme).color.white}
                            />
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                </View>
              </View>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
}
