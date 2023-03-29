import {useEffect, useState} from 'react';
import Request from '../../../Utils/Request';
import Url from '../../../Config/Url';
import Toast from '../../../Utils/Toast';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {Linking, Text, TouchableOpacity} from 'react-native';
import Color from '../../../Styles/Color';
import {scaleWidth} from '../../../Utils/Size';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Download() {
  const [folder, setFolder] = useState([]);

  const firstInit = async () => {
    try {
      const response = await Request.FGet(Url.API.DOWNLOAD.INDEX);

      if (!response.success) {
        Toast.error('Terjadi kesalahan', response.message);
      }
      console.log(response.data);
      setFolder(() => response.data);
    } catch (error) {
      Toast.error('Terjadi kesalahan', 'Terjadi kesalahan saat memuat data');
    }
  };

  useEffect(() => {
    firstInit();
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={folder}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(item.link);
              }}
              style={{
                padding: scaleWidth(3.5),
                paddingHorizontal: scaleWidth(3),
                flexDirection: 'row',
              }}>
              <Icon
                name="folder"
                color={Color.lightMode.primary}
                size={scaleWidth(4.2)}
                style={{
                  marginEnd: scaleWidth(3),
                }}
              />
              <Text
                style={{
                  color: Color.lightMode.secondary,
                  fontWeight: 'bold',
                  fontSize: scaleWidth(4),
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
        style={{
          padding: scaleWidth(3),
        }}
      />
    </SafeAreaView>
  );
}
