import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {useEffect, useState} from 'react';
import Request from '../../../Utils/Request';
import Url from '../../../Config/Url';
import {useNavigation, useRoute} from '@react-navigation/native';
import Toast from '../../../Utils/Toast';
import Theme from '../../../Styles/Theme';
import {scaleHeight, scaleWidth} from '../../../Utils/Size';
import Formatter from '../../../Utils/Formatter';
import Loading from '../../../Components/Loading';
import {err} from 'react-native-svg/lib/typescript/xml';
import RenderHTML from 'react-native-render-html';

export default function TambahInvestasi() {
  const [amount, setAmount] = useState();
  const [infoMax, setInfoMax] = useState({
    'max-investasi': 0,
    'max-tabungan': 0,
    'max-transfer-midtrans': 0,
    'deskripsi-investasi': '',
  });
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  let deskripsi = '';
  let jenisInvestasi = 0;
  if (route.params.id) {
    console.log(route.params);
    jenisInvestasi = route.params.id;
    deskripsi = route.params.deskripsi;
  } else {
    Toast.error('Investasi', 'Jenis Investasi Belum Dipilih');
    navigation.pop();

    jenisInvestasi = route.params.id;
    deskripsi = '';
  }

  const onFirstInit = async () => {
    try {
      const response = await Request.FGetWA(Url.API.INVESTASI.MAXIMUM);
      if (response.success) {
        setInfoMax(response.data);
      } else {
        Toast.error('Gagal', response.message);
        navigation.pop();
      }
    } catch (error) {
      Toast.error('Request Gagal', 'Gagal mengambil data dari server');
      navigation.pop();
    }
  };

  const onTopup = async () => {
    try {
      setLoading(() => true);
      const response = await Request.FPostWA(Url.API.INVESTASI.TOPUP, {
        nominal: parseInt(amount.replaceAll('.', '')),
        jenis_investasi_id: jenisInvestasi,
      });

      if (response.success) {
        setLoading(() => false);

        navigation.replace('app.investasi.detail', {
          id: response.data.id,
        });
        navigation.push('app.webview', {
          title: 'Bayar',
          uri: response.data.url,
        });
      } else {
        Toast.error('Topup Gagal', response.message);
        // navigation.pop();
      }
    } catch (error) {
      console.log(error);
      Toast.error('Topup Gagal', 'Gagal mengirim data ke server');
      // navigation.pop();
    }
    setLoading(() => false);
  };

  useEffect(() => {
    onFirstInit();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Loading loadingState={loading} />
        <View style={styles.container}>
          <View style={styles.header}>
            <RenderHTML
              source={{html: deskripsi}}
              style={[styles.informasiText]}
              contentWidth={scaleWidth(100)}
              tagsStyles={{
                body: {
                  minWidth: '100%',
                  padding: scaleWidth(4),
                  paddingTop: 0,
                  whiteSpace: 'normal',
                  color: Theme().color.white,
                },
              }}
            />
            <Text style={styles.textHeader}>
              Berapa banyak yang ingin anda investasikan ?
            </Text>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formPrefix}>Rp</Text>
            <View style={styles.inputField}>
              <TextInput
                value={Formatter.rupiah(amount)}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholder="Input Amount"
                style={styles.inputControl}
              />
              <Text style={styles.inputLabel}>
                Biaya Administrasi mengikuti kebijakan yang berlaku
              </Text>
            </View>
          </View>

          <View style={styles.footer}>
            <View style={styles.informasi}>
              <Text style={styles.informasiText} />
            </View>
            <TouchableOpacity
              onPress={() => {
                onTopup();
              }}
              style={styles.btnSend}>
              <Text style={styles.btnSendLabel}>Top Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    minHeight: scaleHeight(100),
  },
  header: {
    flex: 0.1,
    backgroundColor: Theme().color.primary,
    paddingHorizontal: scaleWidth(3),
    paddingVertical: scaleHeight(1),
    paddingTop: scaleHeight(5),
    borderBottomEndRadius: scaleWidth(15),
  },
  textHeader: {
    textAlign: 'center',
    fontSize: Theme().size.sm,
    color: Theme().color.neutral,
  },
  formGroup: {
    flex: 0.8,
    paddingHorizontal: scaleWidth(3),
    paddingVertical: scaleHeight(5),
    flexDirection: 'row',
  },
  formPrefix: {
    flex: 0.1,
    fontSize: Theme().size.m,
    color: Theme().color.secondary,
    fontWeight: 'bold',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  inputField: {
    flex: 0.9,
    flexDirection: 'column',
    // backgroundColor: 'red',
  },
  inputControl: {
    borderBottomColor: Theme().color.primary,
    fontSize: Theme().size.m,
    borderBottomWidth: scaleWidth(0.2),
    padding: scaleHeight(0.5),
    marginTop: -scaleHeight(1),
  },
  inputLabel: {
    color: Theme().color.primary,
    paddingTop: scaleHeight(0.5),
  },
  footer: {
    flex: 0.1,
  },
  informasi: {
    alignContent: 'center',
    marginBottom: scaleHeight(2),
  },
  informasiText: {
    color: Theme().color.secondary + 'AA',
    fontSize: Theme().size.xs,
    textAlign: 'center',
  },
  btnSend: {
    marginHorizontal: '10%',
    padding: scaleWidth(3),
    width: '80%',
    backgroundColor: Theme().color.primary,
    borderRadius: scaleWidth(5),
  },
  btnSendLabel: {
    color: Theme().color.neutral,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Theme().size.sm,
  },
});
