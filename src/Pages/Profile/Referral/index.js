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
import LinearGradient from 'react-native-linear-gradient';
import Formatter from '../../../Utils/Formatter';

export const Referral = () => {
  const [data, setData] = useState({
    thead: [
      {
        label: "No",
        width: 10,
      },
      {
        label: "Username",
        width: 25,
      },
      {
        label: "Tabungan",
        width: 25,
      },
      {
        label: "Investasi",
        width: 25,
      },
      {
        label: "Komisi",
        width: 25,
      },
    ],
    tbody: []
  });
  const navigation = useNavigation();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const response = await Request.FGetWA(Url.API.PROFILE.REFERRAL);
      if (response.success) {
        setData(response.data);
      } else {
        Toast.error('Update gagal', response.message);
      }
    } catch (error) {
      Toast.error('Update gagal', 'Terjadi kesalahan saat mengirimkan data');
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
            <ScrollView horizontal>
              <View>
                {data && data.thead && data.thead.length && (
                  <View
                    style={{
                      flexDirection: 'row',
                      // width: '100%',
                    }}>
                    {
                      data.thead.map(head => (
                        <View style={{ padding: scaleWidth(2), width: scaleWidth(head.width), marginBottom: scaleHeight(1) }}>
                          <Text
                            style={{
                              color: Theme().color.secondary,
                              fontWeight: 'bold',
                            }}>
                            {head.label}
                          </Text>
                        </View>
                      ))
                    }
                  </View>
                )}
                {data && data.tbody && data.tbody.length ? (
                  data.tbody.map((item, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        backgroundColor: (index % 2 == 0) ? '#EEE' : '#ccc',
                        padding: scaleWidth(2),
                      }}>
                      {
                        item.map((column, indexColumn) => (
                          <View style={{ width: scaleWidth(data.thead[indexColumn].width) }}>
                            <Text style={{ color: Theme().color.secondary }}>
                              {column}
                            </Text>
                          </View>
                        ))
                      }
                    </View>
                  ))
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          color: Theme().color.secondary,
                          textAlign: 'center',
                        }}>
                        Riwayat Referral Anda Masih Kosong
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </ScrollView>
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
    backgroundColor: Theme().color.neutral,
    padding: scaleHeight(5),
    paddingHorizontal: scaleWidth(5),
  },
});
