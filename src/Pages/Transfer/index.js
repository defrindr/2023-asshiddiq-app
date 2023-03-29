import {
  ActivityIndicator,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../../Styles/Theme';
import { scaleHeight, scaleWidth } from '../../Utils/Size';
import { ScrollView } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import Request from '../../Utils/Request';
import Url from '../../Config/Url';
import { LineChart } from 'react-native-chart-kit';
import Toast from '../../Utils/Toast';
import Formatter from '../../Utils/Formatter';
import Loading from '../../Components/Loading';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome";
import Color from '../../Styles/Color';

const ModalDetail = ({ isActive = true, details = [], onClose = () => { } }) => {
  return (
    <Modal visible={isActive} transparent>
      <View
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          backgroundColor: '#00000024',
          height: '100%',
        }}>
        <View
          style={{
            backgroundColor: Theme().color.neutral,
            borderColor: Theme().color.dark,
            borderWidth: scaleWidth(0.2),
            width: '80%',
            borderRadius: scaleWidth(4),
            padding: scaleWidth(4),
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              onClose();
            }}
            style={{
              backgroundColor: Theme().color.primary,
              padding: scaleWidth(1),
              borderRadius: Theme().size.s,
              marginBottom: Theme().size.sm,
            }}>
            <Text
              style={{
                color: Theme().color.neutral,
                fontSize: Theme().size.sm,
                textAlign: 'center',
              }}>
              Tutup
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'column', padding: scaleWidth(0) }}>
            {details.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    flex: 0.6,
                    color: Theme().color.secondary,
                    fontSize: Theme().size.s,
                    paddingBottom: Theme().size.xs,
                  }}>
                  {item.title}
                </Text>
                <Text
                  style={{
                    flex: 0.4,
                    color: Theme().color.secondary,
                    fontSize: Theme().size.s,
                    paddingBottom: Theme().size.xs,
                  }}>
                  {Formatter.rupiah(item.value, 'Rp. ')}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default function Transfer() {
  const theme = useColorScheme();
  const [totalTabungan, setTotalTabungan] = useState(0);
  const [grafikTabungan, setGrafikTabungan] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });
  const [grafikInvestasi, setGrafikInvestasi] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });

  const [modalShow, setModalShow] = useState(false);
  const [detailTotal, setDetailTotal] = useState([
    {
      title: 'Total Tabungan',
      value: 0,
    },
    {
      title: 'Total Cashback Tabungan',
      value: 0,
    },
    {
      title: 'Total Refferral',
      value: 0,
    },
  ]);

  const [firstIniLoad, setFirstIniLoad] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    onFirstInit();
  }, []);

  const onFirstInit = async () => {
    setFirstIniLoad(true);
    try {
      const response = await Request.FGetWA(Url.API.HISTORY.GRAFIK);
      const user = await Request.FGetWA(Url.API.PROFILE.VIEW);

      if (response.success) {
        setGrafikTabungan(() => {
          return {
            labels: response.data.tanggal,
            datasets: [
              {
                data: response.data.tabungan,
              },
            ],
          };
        });
        setGrafikInvestasi(() => {
          return {
            labels: response.data.tanggal,
            datasets: [
              {
                data: response.data.investasi,
              },
            ],
          };
        });
      } else {
        Toast.error('Gagal Memuat', response.message);
      }

      if (user.success) {
        let total =
          parseInt(user.data.total_cashback) +
          parseInt(user.data.total_investasi) +
          parseInt(user.data.total_komisi) +
          parseInt(user.data.total_tabungan);

        setDetailTotal(() => {
          return [
            {
              title: 'Total Komisi',
              value: user.data.total_komisi,
            },
            {
              title: 'Total Cashback',
              value: user.data.total_cashback,
            },
            {
              title: 'Total Investasi',
              value: user.data.total_investasi,
            },
            {
              title: 'Total Tabungan',
              value: user.data.total_tabungan,
            },
          ];
        });
        setTotalTabungan(total);
      } else {
        Toast.error('Gagal Memuat', user.message);
      }
    } catch (error) {
      Toast.error('Gagal Memuat', 'Gagal mengambil data dari server');
    }
    setFirstIniLoad(false);
  };

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={firstIniLoad}
            onRefresh={() => {
              onFirstInit();
            }}
          />
        }>
        <ModalDetail
          onClose={() => {
            setModalShow(!modalShow);
          }}
          details={detailTotal}
          isActive={modalShow}
        />
        <View
          style={{
            flexDirection: 'row',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: Theme(theme).color.neutral,
            paddingBottom: scaleHeight(5),
            borderBottomStartRadius: scaleWidth(7),
            borderBottomEndRadius: scaleWidth(7),
          }}>
          <LinearGradient
            colors={[
              Theme(theme).color.primary,
              Theme(theme).color.primary + '99',
            ]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          />
          <View
            style={{
              flex: 1,
              width: '100%',
              padding: scaleWidth(1.5),
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text
              style={{
                marginLeft: scaleWidth(4),
                fontSize: Theme(theme).size.m,
                fontWeight: 'bold',
                color: 'white',
                alignSelf: 'flex-start',
                marginBottom: scaleHeight(1),
              }}>
              Riwayat Transfer
            </Text>

            {/* Darbe Cash */}
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginTop: scaleHeight(1),
                padding: scaleWidth(1.5),
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: scaleWidth(1),
                  borderRadius: scaleWidth(1),
                  marginRight: scaleWidth(1),
                }}>
                <Text
                  style={{
                    fontSize: Theme(theme).size.s,
                    fontWeight: 'bold',
                    color: Theme(theme).color.white,
                  }}>
                  Jumlah Dana
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setModalShow(!modalShow);
                }}
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  // backgroundColor: Color.lightMode.primary,
                  alignItems: 'center',
                  padding: scaleWidth(3),
                  marginRight: scaleWidth(1),
                  borderBottomWidth: scaleWidth(0.1),
                  borderColor: Theme(theme).color.white,
                  width: '100%',
                  flexDirection: 'row',
                }}>
                <Icon name="eye" color="white" style={{
                  marginRight: scaleWidth(4),
                }} />
                <Text
                  style={{
                    fontSize: Theme(theme).size.s,
                    fontWeight: 'bold',
                    color: Theme(theme).color.white,
                  }}>
                  {Formatter.rupiah(totalTabungan, 'Rp. ')}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Darbe Transfer */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginTop: scaleHeight(1),
                padding: scaleWidth(1.5),
                borderRadius: scaleWidth(1),
                borderWidth: scaleWidth(0.1),
                borderColor: Theme(theme).color.white,
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.push('app.tabungan');
                }}
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: scaleWidth(1),
                  borderRadius: scaleWidth(1),
                  marginRight: scaleWidth(1),
                }}>
                <Text
                  style={{
                    fontSize: Theme(theme).size.s,
                    fontWeight: 'bold',
                    color: Theme(theme).color.white,
                  }}>
                  Simpanan
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  // flex: .01,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: scaleWidth(1),
                  marginRight: scaleWidth(1),
                  height: '100%',
                }}>
                <View
                  style={{
                    width: scaleWidth(0.4),
                    height: '100%',
                    backgroundColor: Theme(theme).color.white,
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.push('app.investasi');
                }}
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: scaleWidth(1),
                  marginRight: scaleWidth(1),
                }}>
                <Text
                  style={{
                    fontSize: Theme(theme).size.s,
                    fontWeight: 'bold',
                    color: Theme(theme).color.white,
                  }}>
                  Investasi
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            margin: '5%',
          }}>
          <View
            style={{
              flexDirection: 'column',
              alignSelf: 'flex-start',
              width: '90%',
            }}>
            <Text
              style={{
                fontSize: Theme(theme).size.s,
                fontWeight: 'bold',
                color: Theme(theme).color.black,
                marginBottom: scaleHeight(1),
              }}>
              Grafik Tabungan
            </Text>

            <View
              style={{
                borderRadius: scaleHeight(2),
                overflow: 'hidden',
                padding: scaleHeight(1),
                backgroundColor: Theme().color.neutral,
              }}>
              <ScrollView horizontal={true} horizontalScrollIndicator={false}>
                <LineChart
                  bezier
                  data={{
                    labels: grafikTabungan.labels,
                    datasets: grafikTabungan.datasets,
                  }}
                  verticalLabelRotation={90}
                  width={scaleWidth(100)} // from react-native
                  height={scaleHeight(50)}
                  withInnerLines={false}
                  withDots={true}
                  withShadow={false}
                  // withScrollableDot={true}
                  onDataPointClick={({ value, getColor }) => {
                    // console.log(value);
                  }}
                  yAxisInterval={2} // optional, defaults to 1
                  chartConfig={{
                    backgroundGradientFrom: Theme().color.neutral,
                    backgroundGradientTo: Theme().color.neutral,
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => Theme().color.primary,
                    labelColor: (opacity = 1) => '#A0A0A0',

                    linejoinType: 'round',

                    scrollableDotFill: '#fff',
                    scrollableDotRadius: 6,
                    scrollableDotStrokeColor: Theme().color.primary,
                    scrollableDotStrokeWidth: 3,

                    scrollableInfoViewStyle: {
                      justifyContent: 'center',
                      alignContent: 'center',
                      backgroundColor: '#FFF',
                      borderRadius: 2,
                    },
                    scrollableInfoTextStyle: {
                      color: '#C4C4C4',
                      marginHorizontal: 4,
                      flex: 1,
                      textAlign: 'center',
                    },
                    scrollableInfoSize: {
                      width: scaleHeight(5),
                      height: scaleHeight(5),
                    },
                    scrollableInfoOffset: 15,
                  }}
                  style={{
                    marginVertical: 8,
                  }}
                />
              </ScrollView>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'flex-start',
              marginTop: scaleHeight(1),
              width: '90%',
            }}>
            <View
              style={{
                flexDirection: 'column',
                alignSelf: 'flex-start',
                width: '100%',
              }}>
              <Text
                style={{
                  fontSize: Theme(theme).size.s,
                  fontWeight: 'bold',
                  alignSelf: 'flex-start',
                  marginTop: scaleHeight(2),
                  marginBottom: scaleHeight(1),
                  color: Theme(theme).color.black,
                }}>
                Grafik Investasi
              </Text>

              <View
                style={{
                  borderRadius: scaleHeight(2),
                  overflow: 'hidden',
                  padding: scaleHeight(1),
                  backgroundColor: Theme().color.neutral,
                }}>
                <ScrollView horizontal={true} horizontalScrollIndicator={false}>
                  <LineChart
                    bezier
                    data={{
                      labels: grafikInvestasi.labels,
                      datasets: grafikInvestasi.datasets,
                    }}
                    verticalLabelRotation={90}
                    width={scaleWidth(100)} // from react-native
                    height={scaleHeight(50)}
                    withInnerLines={false}
                    withDots={true}
                    withShadow={false}
                    // withScrollableDot={true}
                    onDataPointClick={({ value, getColor }) => {
                      // console.log(value);
                    }}
                    yAxisInterval={2} // optional, defaults to 1
                    chartConfig={{
                      backgroundGradientFrom: Theme().color.neutral,
                      backgroundGradientTo: Theme().color.neutral,
                      decimalPlaces: 0, // optional, defaults to 2dp
                      color: (opacity = 1) => Theme().color.primary,
                      labelColor: (opacity = 1) => '#A0A0A0',
                      linejoinType: 'round',

                      scrollableDotFill: '#fff',
                      scrollableDotRadius: 6,
                      scrollableDotStrokeColor: Theme().color.primary,
                      scrollableDotStrokeWidth: 3,

                      scrollableInfoViewStyle: {
                        justifyContent: 'center',
                        alignContent: 'center',
                        backgroundColor: '#FFF',
                        borderRadius: 2,
                      },
                      scrollableInfoTextStyle: {
                        color: '#C4C4C4',
                        marginHorizontal: 4,
                        flex: 1,
                        textAlign: 'center',
                      },
                      scrollableInfoSize: {
                        width: scaleHeight(5),
                        height: scaleHeight(5),
                      },
                      scrollableInfoOffset: 15,
                    }}
                    style={{
                      marginVertical: 8,
                    }}
                  />
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  grafik: {
    width: '100%',
  },
});
