import {
  FlatList,
  RefreshControl,
  ScrollView,
} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useEffect, useState} from 'react';
import Request from '../../../Utils/Request';
import Url from '../../../Config/Url';
import {useNavigation} from '@react-navigation/native';
import Toast from '../../../Utils/Toast';
import Size, {scaleHeight, scaleWidth} from '../../../Utils/Size';
import Theme from '../../../Styles/Theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Formatter from '../../../Utils/Formatter';
import moment from 'moment';
import Loading from '../../../Components/Loading';
import Color from '../../../Styles/Color';

const Item = ({data = {}}) => {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.push('app.investasi.tambah', {
            id: data.id ?? 0,
            deskripsi: data.deskripsi,
          });
        }}
        style={{
          // container
          width: scaleWidth(45),
          margin: scaleWidth(1),
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          padding: scaleWidth(4),
          borderRadius: scaleWidth(2),
          borderColor: Theme().color.secondary + '33',
          borderWidth: 1,
          backgroundColor: Theme().color.neutral,
          justifyContent: 'space-between',
          marginBottom: scaleHeight(1),
        }}>
        <Image
          source={{
            uri: data.image,
          }}
          resizeMode="cover"
          style={{
            width: '100%',
            height: scaleHeight(20),
          }}
        />
        <Text
          style={{
            color: Color.lightMode.secondary,
            fontSize: scaleWidth(4),
            fontWeight: 'bold',
            marginTop: scaleHeight(1),
          }}>
          {data.name}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default function InvestasiList() {
  const [listInvestasi, setListInvestasi] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const navigation = useNavigation();

  const onFirstInit = async () => {
    const response = await Request.FGet(Url.API.INVESTASI.LIST);
    if (response.success) {
      setListInvestasi(response.data);
    }
  };

  useEffect(() => {
    onFirstInit();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Loading loadingState={loadingState} />
        <FlatList
          numColumns={2}
          data={listInvestasi}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return <Item data={item} />;
          }}
          style={{
            marginTop: scaleHeight(3),
            padding: scaleWidth(3),
            // backgroundColor: 'red',
            height: '100%',
          }}
          ListEmptyComponent={
            <Image
              style={{
                width: scaleWidth(80),
                height: scaleWidth(80),
                alignSelf: 'center',
              }}
              source={require('@assets/images/no-content.png')}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: scaleWidth(2),
  },
  tabList: {
    flexDirection: 'row',
  },
  tabButton: selected => ({
    flex: 0.5,
    backgroundColor: selected ? Theme().color.primary : 'transparent',
    padding: scaleWidth(2),
  }),
  tabButtonText: selected => ({
    textAlign: 'center',
    color: selected ? Theme().color.neutral : Theme().color.primary,
    fontWeight: 'bold',
  }),
});
