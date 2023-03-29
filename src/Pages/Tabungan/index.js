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
import Request from '../../Utils/Request';
import Url from '../../Config/Url';
import {useNavigation} from '@react-navigation/native';
import Toast from '../../Utils/Toast';
import {scaleHeight, scaleWidth} from '../../Utils/Size';
import Theme from '../../Styles/Theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Formatter from '../../Utils/Formatter';
import moment from 'moment';
import Loading from '../../Components/Loading';

const Item = ({data = {}}) => {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.push('app.tabungan.detail', {
            id: data.id ?? 0,
          });
        }}
        style={{
          // container
          flexDirection: 'row',
          padding: scaleWidth(4),
          borderRadius: scaleWidth(4),
          borderColor: Theme().color.secondary + '33',
          borderWidth: 1,
          backgroundColor: Theme().color.neutral,
          justifyContent: 'space-between',
          marginBottom: scaleHeight(1),
        }}>
        <View
          style={{
            // leftIcon
            flex: 0.1,
            padding: scaleWidth(3),
            borderColor:
              data.status === 'Pending'
                ? Theme().color.warning
                : data.status === 'Pembayaran Berhasil'
                ? Theme().color.success
                : Theme().color.danger,
            borderWidth: 1,
            alignItems: 'center',
            borderRadius: scaleHeight(1),
            height: scaleWidth(12),
          }}>
          <Icon
            name={'wallet'}
            style={{
              fontSize: Theme().size.m,
              color:
                data.status === 'Pending'
                  ? Theme().color.warning
                  : data.status === 'Pembayaran Berhasil'
                  ? Theme().color.success
                  : Theme().color.danger,
            }}
          />
        </View>

        <View
          style={{
            // rightData
            flex: 0.6,
            padding: scaleWidth(1),
            paddingHorizontal: scaleWidth(3),
            // backgroundColor: Theme().color.primary,
            alignItems: 'center',
            borderRadius: scaleHeight(100),
            // backgroundColor: 'red',
            alignItems: 'flex-start',
            // justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: Theme().color.secondary,
              textAlign: 'left',
              fontWeight: 'bold',
              fontSize: Theme().size.s,
              // backgroundColor: 'red'
            }}>
            Top Up
          </Text>
          <Text
            style={{
              marginTop: scaleHeight(0.5),
              color: Theme().color.secondary,
              textAlign: 'left',
              fontSize: Theme().size.xs,
              // backgroundColor: 'red'
            }}>
            {moment(data.created_at).format('DD MMMM YYYY, HH:mm')}
          </Text>
          <Text
            style={{
              // marginTop: scaleHeight(.5),
              color: Theme().color.secondary,
              textAlign: 'left',
              fontSize: Theme().size.xs,
              // backgroundColor: 'red'
            }}>
            {data.status}
          </Text>
        </View>

        <View
          style={{
            // rightData
            flex: 0.3,
            padding: scaleWidth(1),
            paddingHorizontal: scaleWidth(3),
            // backgroundColor: Theme().color.primary,
            alignItems: 'center',
            borderRadius: scaleHeight(100),
            height: scaleWidth(12),
            // backgroundColor: 'red',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: Theme().color.secondary,
              textAlign: 'left',
              fontWeight: 'bold',
              fontSize: Theme().size.s,
              // backgroundColor: 'red'
            }}>
            {Formatter.rupiah(data.nominal, 'Rp. ')}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default function Tabungan() {
  const [selectedTab, setSelectedTab] = useState('pending');
  const [listTransaction, setListTransaction] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const navigation = useNavigation();

  const onFirstInit = async () => {};

  const getHistoryTransaction = async () => {
    setLoadingState(true);
    try {
      const response = await Request.FGetWA(
        Url.API.TABUNGAN.HISTORY + '?query=' + selectedTab,
      );

      console.log(Url.API.TABUNGAN.HISTORY + '?query=' + selectedTab);

      if (response.success) {
        setListTransaction(() => response.data);
      } else {
        Toast.error('Terjadi Kesalahan', response.message);
        setListTransaction(() => []);
      }
    } catch (error) {
      Toast.error('Terjadi Kesalahan', 'Gagal Mengambil Data');
      setListTransaction(() => []);
    }
    setLoadingState(false);
  };

  useEffect(() => {
    getHistoryTransaction();
  }, [selectedTab]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Loading loadingState={loadingState} />
        <View style={styles.tabList}>
          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.tabButton(selectedTab === 'pending'),
              {
                borderBottomEndRadius: scaleWidth(5),
                borderBottomStartRadius: scaleWidth(5),
              },
            ]}
            onPress={() => {
              setSelectedTab(() => 'pending');
            }}>
            <Text style={styles.tabButtonText(selectedTab === 'pending')}>
              Pending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.tabButton(selectedTab === 'history'),
              {
                borderBottomEndRadius: scaleWidth(5),
                borderBottomStartRadius: scaleWidth(5),
              },
            ]}
            onPress={() => {
              setSelectedTab(() => 'history');
            }}>
            <Text style={styles.tabButtonText(selectedTab === 'history')}>
              Riwayat
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          refreshControl={
            <RefreshControl
              onRefresh={() => {
                getHistoryTransaction();
              }}
              refreshing={false}
            />
          }
          data={listTransaction}
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
              source={require('../../Assets/images/no-content.png')}
            />
          }
          ListFooterComponent={<View style={{height: scaleHeight(15)}} />}
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
