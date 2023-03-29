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
import {useNavigation, useRoute} from '@react-navigation/native';
import Toast from '../../../Utils/Toast';
import {scaleHeight, scaleWidth} from '../../../Utils/Size';
import Theme from '../../../Styles/Theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Formatter from '../../../Utils/Formatter';
import moment from 'moment';
import Loading from '../../../Components/Loading';

export default function TabunganDetail() {
  const [transaction, setTransaction] = useState({
    created_at: null,
    kode_transaksi: null,
    status: null,
    code: null,
    nominal: 0,
    komisi: 0,
    cashback: 0,
  });
  const [user, setUser] = useState({});
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const {id = 0} = route.params;

  const onRefusedTransaction = async () => {
    setLoading(true);
    try {
      const response = await Request.FPostWA(
        Url.API.TABUNGAN.CANCEL + '?id=' + id,
      );

      if (response.success) {
        Toast.success('Berhasil Dibatalkan', response.message);
        getDetailTransaction();
      } else {
        Toast.error('Terjadi Kesalahan', response.message);
      }
    } catch (error) {
      Toast.error('Terjadi Kesalahan', 'Transaksi Tidak Ditemukan');
    }
    setLoading(false);
  };

  const getDetailTransaction = async () => {
    try {
      const response = await Request.FGetWA(
        Url.API.TABUNGAN.DETAIL + '?id=' + id,
      );

      console.log('DETAIL TABUNGAN', response.data);

      if (response.success) {
        setTransaction(() => response.data);
      } else {
        Toast.error('Terjadi Kesalahan', response.message);
        setTransaction(() => null);
        navigation.pop();
      }
    } catch (error) {
      Toast.error('Terjadi Kesalahan', 'Transaksi Tidak Ditemukan');
      setTransaction(() => null);
      navigation.pop();
    }
  };

  useEffect(() => {
    getDetailTransaction();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              getDetailTransaction();
            }}
          />
        }>
        <View
          style={{
            minHeight: scaleHeight(100),
          }}>
          <Loading loadingState={loading} />
          <View style={styles.background} />
          <View style={styles.container}>
            <View style={styles.box}>
              <Image
                source={require('../../../Assets/images/logo.png')}
                style={{
                  width: '100%',
                  height: scaleHeight(20),
                  marginBottom: scaleHeight(4),
                }}
                resizeMode="contain"
              />
              {transaction && (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        flex: 0.5,
                      }}>
                      <Text
                        style={{
                          fontSize: Theme().size.s,
                        }}>
                        {transaction.created_at &&
                        transaction.created_at !== null
                          ? moment(transaction.created_at).format(
                              'DD MMMM YYYY, HH:mm',
                            )
                          : ''}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 0.5,
                        alignItems: 'flex-end',
                      }}>
                      <Text
                        style={{
                          fontSize: Theme().size.s,
                        }}>
                        {transaction.kode_transaksi}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      height: scaleHeight(1),
                      borderBottomColor: Theme().color.secondary + '66',
                      borderBottomWidth: 1,
                    }}
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Icon
                      name={'clock'}
                      style={{
                        marginRight: scaleWidth(1),
                        padding: scaleWidth(1),
                        fontSize: Theme().size.s,
                        color:
                          transaction.status === 'Pending'
                            ? Theme().color.warning
                            : transaction.status === 'Pembayaran Berhasil'
                            ? Theme().color.success
                            : Theme().color.danger,
                      }}
                    />
                    <Text
                      style={{
                        padding: scaleWidth(0.8),
                        fontSize: Theme().size.s,
                        color:
                          transaction.status === 'Pending'
                            ? Theme().color.warning
                            : transaction.status === 'Pembayaran Berhasil'
                            ? Theme().color.success
                            : Theme().color.danger,
                      }}>
                      {transaction.status}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: scaleHeight(2),
                    }}>
                    <View
                      style={{
                        flex: 0.5,
                      }}>
                      <Text
                        style={{
                          fontSize: Theme().size.s,
                          fontWeight: 'bold',
                        }}>
                        Kode Ref Transaksi
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 0.5,
                        // alignItems: "flex-end"
                      }}>
                      <Text
                        style={{
                          fontSize: Theme().size.s,
                        }}>
                        {transaction.code}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: scaleHeight(1),
                    }}>
                    <View
                      style={{
                        flex: 0.5,
                      }}>
                      <Text
                        style={{
                          fontSize: Theme().size.s,
                          fontWeight: 'bold',
                        }}>
                        Nominal
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 0.5,
                        // alignItems: "flex-end"
                      }}>
                      <Text
                        style={{
                          fontSize: Theme().size.s,
                        }}>
                        {Formatter.rupiah(transaction.nominal, 'Rp. ')}
                      </Text>
                    </View>
                  </View>

                  {/* <View
                    style={{
                      flexDirection: 'row',
                      marginTop: scaleHeight(1),
                    }}>
                    <View
                      style={{
                        flex: 0.5,
                      }}>
                      <Text
                        style={{
                          fontSize: Theme().size.s,
                          fontWeight: 'bold',
                        }}>
                        Komisi
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 0.5,
                        alignItems: "flex-end"
                      }}>
                      <Text
                        style={{
                          fontSize: Theme().size.s,
                        }}>
                        {transaction.komisi_persentase}
                      </Text>
                    </View>
                  </View> */}

                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: scaleHeight(1),
                    }}>
                    <View
                      style={{
                        flex: 0.5,
                      }}>
                      <Text
                        style={{
                          fontSize: Theme().size.s,
                          fontWeight: 'bold',
                        }}>
                        Subsidi (10%)
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 0.5,
                        // alignItems: "flex-end"
                      }}>
                      <Text
                        style={{
                          fontSize: Theme().size.s,
                        }}>
                        {Formatter.rupiah(transaction.cashback, 'Rp. ')}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: scaleHeight(1),
                    }}>
                    <View
                      style={{
                        flex: 0.5,
                      }}>
                      <Text
                        style={{
                          fontSize: Theme().size.s,
                          fontWeight: 'bold',
                        }}>
                        Total
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 0.5,
                        // alignItems: "flex-end"
                      }}>
                      <Text
                        style={{
                          fontSize: Theme().size.s,
                        }}>
                        {Formatter.rupiah(
                          transaction.cashback + transaction.nominal,
                          'Rp. ',
                        )}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: scaleHeight(1),
                    }}>
                    <View
                      style={{
                        flex: 0.5,
                      }}>
                      <Text
                        style={{
                          fontSize: Theme().size.s,
                          fontWeight: 'bold',
                        }}>
                        Status Transaksi
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 0.5,
                        // alignItems: "flex-end"
                      }}>
                      <Text
                        style={{
                          fontSize: Theme().size.s,
                        }}>
                        {transaction.status_transaksi}
                      </Text>
                    </View>
                  </View>

                  {transaction && transaction.status == 'Pending' && (
                    <>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.push('app.webview', {
                            title: 'Bayar',
                            uri: transaction.url,
                          });
                        }}
                        style={{
                          backgroundColor: Theme().color.primary,
                          padding: Theme().size.xs,
                          marginTop: Theme().size.s,
                          borderRadius: Theme().size.s,
                        }}>
                        <Text
                          style={{
                            color: Theme().color.neutral,
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: Theme().size.s,
                          }}>
                          Bayar
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          onRefusedTransaction();
                        }}
                        style={{
                          backgroundColor: Theme().color.danger,
                          padding: Theme().size.xs,
                          marginTop: Theme().size.s,
                          borderRadius: Theme().size.s,
                        }}>
                        <Text
                          style={{
                            color: Theme().color.neutral,
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: Theme().size.s,
                          }}>
                          Batalkan Transaksi
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: scaleWidth(3),
  },
  box: {
    backgroundColor: Theme().color.neutral,
    padding: scaleWidth(5),
    width: '100%',
    minHeight: scaleHeight(50),
    // position: 'absolute',
    marginTop: -scaleHeight(25),
    borderRadius: scaleWidth(5),
  },
  background: {
    backgroundColor: Theme().color.primary,
    width: '100%',
    height: scaleHeight(25),
  },
});
