import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { scaleWidth } from '@utils/Size';
import Theme from '@styles/Theme';
import { scaleHeight } from '../../Utils/Size';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import AuthHelper from '../../Utils/AuthHelper';
import Request from '../../Utils/Request';
import Url from '../../Config/Url';
import Toast from '../../Utils/Toast';

const Menu = ({ information = [], menu = [], theme }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
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

    loadUser();
  }, []);

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).informationContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.push('app.tabungan.tambah');
          }}
          style={styles(theme).informationItem}>
          <Icon
            name="wallet"
            size={scaleWidth(5)}
            color={Theme(theme).color.secondary}
            style={{
              alignSelf: 'center',
              color: Theme(theme).color.primary + 'AA',
            }}
          />
          <Text style={styles(theme).informationTitle}>Simpanan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.push('app.investasi.list');
          }}
          style={[styles(theme).informationItem]}>
          <Icon
            name="hand-holding-usd"
            size={scaleWidth(5)}
            color={Theme(theme).color.secondary}
            style={{
              alignSelf: 'center',
              color: Theme(theme).color.primary + 'AA',
            }}
          />
          <Text style={styles(theme).informationTitle}>Investasi</Text>
        </TouchableOpacity>
        {
          (user && user.sobat) ?
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.push('app.download');
              }}
              style={styles(theme).informationItem}>
              <Icon
                name="download"
                size={scaleWidth(5)}
                color={Theme(theme).color.secondary}
                style={{
                  alignSelf: 'center',
                  color: Theme(theme).color.primary + 'AA',
                }}
              />
              <Text style={styles(theme).informationTitle}>Download</Text>
            </TouchableOpacity>
            : <></>
        }
      </View>
    </View>
  );
};

const styles = theme =>
  StyleSheet.create({
    container: {
      padding: scaleWidth(3),
      flexDirection: 'column',
      height: scaleHeight(5),
    },
    informationContainer: {
      // flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      transform: [
        {
          translateY: -scaleHeight(6),
        },
      ],
    },
    informationItem: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '3%',
      paddingVertical: scaleWidth(3),
      paddingHorizontal: scaleWidth(3),
      backgroundColor: Theme(theme).color.neutral,
      shadowColor: Theme(theme).color.dark,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
      borderRadius: scaleWidth(3),
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    informationTitle: {
      color: Theme(theme).color.primary + 'AA',
      fontSize: scaleWidth(3),
      textAlign: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      fontWeight: 'bold',
      marginTop: scaleWidth(1),
    },
    informationDivider: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
      padding: scaleWidth(1),
    },
    informationValue: {
      color: Theme(theme).color.dark,
      fontSize: scaleWidth(8),
      fontWeight: 'bold',
      transform: [
        {
          translateY: scaleWidth(1),
        },
      ],
      marginEnd: scaleWidth(1),
    },
    informationText: {
      color: Theme(theme).color.dark,
      fontSize: scaleWidth(4),
      marginEnd: scaleWidth(1),
    },
  });

export default Menu;
