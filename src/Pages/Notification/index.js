import {Alert, Image, ScrollView, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {scaleHeight, scaleWidth} from '../../Utils/Size';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Theme from '../../Styles/Theme';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Request from '../../Utils/Request';
import Url from '../../Config/Url';
import Toast from '../../Utils/Toast';
import AuthHelper from '../../Utils/AuthHelper';
import moment from 'moment';

export const Notification = () => {
  const navigation = useNavigation();
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    getNotification();
  }, []);

  const getNotification = async () => {
    try {
      const response = await Request.FGetWA(Url.API.NOTIFICATION.ALL);

      if (response.success) {
        setNotification(response.data);
      } else {
        Toast.error('Notifikasi', response.message);
      }
    } catch (error) {
      console.log(error);
      Toast.error('Notifikasi', 'Terjadi kesalahan saat mengirimkan data');
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {notification &&
            notification.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.notification]}
                onPress={() => {
                  // navigation.push('app.notification.detail', {
                  //     id: item.id
                  // })
                }}>
                <View style={[styles.imageContainer]}>
                  <Icon
                    name={'bell'}
                    size={Theme().size.m}
                    style={styles.image}
                  />
                </View>
                <View style={styles.body}>
                  <Text style={styles.title}>{item.message}</Text>
                  <Text style={styles.datetime}>
                    {moment(item.date).format('DD MMMM YYYY, HH:mm')}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
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
  notification: {
    flexDirection: 'row',
    marginBottom: scaleHeight(1),
  },
  imageContainer: {
    overflow: 'hidden',
    borderRadius: scaleWidth(3),
  },
  image: {
    borderRadius: scaleWidth(3),
    color: Theme().color.neutral,
    padding: scaleWidth(2),
    marginRight: scaleHeight(1),
    backgroundColor: Theme().color.primary,
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
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
