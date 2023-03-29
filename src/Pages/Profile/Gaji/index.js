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
import Color from '../../../Styles/Color';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import size from '../../../Styles/Spacing';

export const Gaji = () => {
    const [showBulanDropdown, setShowBulanDropdown] = useState(false);
    const [showTahunDropdown, setShowTahunDropdown] = useState(false);

    const [bulan, setBulan] = useState(null);
    const [tahun, setTahun] = useState(null);

    const [listBulan, setListBulan] = useState([
        { label: 'Januari', value: '01' },
        { label: 'Februari', value: '02' },
        { label: 'Maret', value: '03' },
        { label: 'April', value: '04' },
        { label: 'Mei', value: '05' },
        { label: 'Juni', value: '06' },
        { label: 'Juli', value: '07' },
        { label: 'Agustus', value: '08' },
        { label: 'September', value: '09' },
        { label: 'Oktober', value: '10' },
        { label: 'November', value: '11' },
        { label: 'Desember', value: '12' },
    ]);
    const [listTahun, setListTahun] = useState([]);


    const [data, setData] = useState(null);


    const getGaji = async (bulan = null, tahun = null) => {
        if (bulan != null) {
            if (tahun == null) {
                Toast.error("Perbaiki Isian Anda", "Tahun tidak boleh kosong");
                return;
            }
        } else {
            if (tahun != null) {
                Toast.error("Perbaiki Isian Anda", "Bulan tidak boleh kosong");
                return;
            }
        }

        let param = "";
        if (bulan) {
            param = `?tahun=${tahun}&bulan=${bulan}`;
        }
        console.log('url', Url.API.PROFILE.GAJI + param)
        try {
            const response = await Request.FGetWA(Url.API.PROFILE.GAJI + param);
            console.log(response)
            if (response.success) {
                setData(response.data);
            } else {
                Toast.error("Data Gaji", response.message);
            }
        } catch (error) {
            Toast.error("Data Gaji", "Terjadi kesalahan saat mengambil data");
        }
    }

    const generateTahun = () => {
        const tahunSekarang = new Date().getFullYear();

        const listTahunDummy = [];

        const end = tahunSekarang - 5;

        for (let i = tahunSekarang; i >= end; i--) {
            listTahunDummy.push({
                label: i,
                value: i,
            });
        }

        setListTahun(listTahunDummy);
    }

    useEffect(() => console.log(listTahun), [listTahun])

    useEffect(() => {
        getGaji();
        generateTahun();
    }, []);



    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <LinearGradient
                        style={styles.background}
                        colors={[Theme().color.primary, Theme().color.neutral]}
                    />
                    <View style={styles.box}>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: scaleWidth(4.5),
                            color: Color.lightMode.secondary,
                        }}>
                            Cari Slip Gaji Anda
                        </Text>
                        <View style={{
                            // flexDirection: 'row',
                            position: 'relative',
                            zIndex: 9999,
                            marginTop: scaleHeight(1),
                        }}>
                            <DropDownPicker
                                containerProps={{
                                    height: showBulanDropdown === true ? 250 : null,
                                    marginTop: scaleHeight(2),
                                }}
                                open={showBulanDropdown}
                                setOpen={setShowBulanDropdown}
                                setValue={(value) => {
                                    let val = value();
                                    setBulan(val);
                                }}
                                items={listBulan}
                                // dropDownDirection="TOP"
                                value={bulan}
                                placeholder={'Pilih Bulan'}
                                listMode={'SCROLLVIEW'}
                            />
                            <DropDownPicker
                                containerProps={{
                                    height: showTahunDropdown === true ? 250 : null,
                                    marginTop: scaleHeight(2),
                                }}
                                open={showTahunDropdown}
                                setOpen={setShowTahunDropdown}
                                setValue={(value) => {
                                    let val = value();
                                    setTahun(val);
                                }}
                                items={listTahun}
                                // dropDownDirection="TOP"
                                value={tahun}
                                placeholder={'Pilih Tahun'}
                                listMode={'SCROLLVIEW'}
                            />

                            <TouchableOpacity
                                onPress={() => {
                                    getGaji(bulan, tahun)
                                }}
                                style={{
                                    backgroundColor: Color.lightMode.primary,
                                    padding: scaleWidth(2),
                                    marginTop: scaleHeight(2),
                                    borderRadius: scaleWidth(3),
                                    width: '30%',
                                    alignSelf: 'center',
                                    flexDirection: 'row',
                                    alignContent: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Icon name="search" color={Color.lightMode.white}></Icon>
                                <Text style={{ color: Color.lightMode.white, textAlign: 'center', marginStart: scaleWidth(1) }}>Cari</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {
                        data && (
                            <View style={[styles.box, {
                                marginTop: scaleHeight(1)
                            }]}>
                                {data.tanggal && (
                                    <View style={{ flexDirection: 'row', marginTop: scaleHeight(.5) }}>
                                        <Text style={{
                                            flex: .5,
                                            color: Color.lightMode.secondary,
                                            fontWeight: 'bold',
                                            fontSize: size.xs,
                                        }}>
                                            Bulan
                                        </Text>
                                        <Text style={{
                                            flex: .5,
                                            color: Color.lightMode.secondary,
                                            // fontWeight: 'bold',
                                            fontSize: size.xs,
                                        }}>
                                            {moment(data.tanggal).format("MMMM YYYY")}
                                        </Text>
                                    </View>
                                )}
                                {data.keterangan && (
                                    <View style={{ flexDirection: 'row', marginTop: scaleHeight(.5) }}>
                                        <Text style={{
                                            flex: .5,
                                            color: Color.lightMode.secondary,
                                            fontWeight: 'bold',
                                            fontSize: size.xs,
                                        }}>
                                            Keterangan
                                        </Text>
                                        <Text style={{
                                            flex: .5,
                                            color: Color.lightMode.secondary,
                                            // fontWeight: 'bold',
                                            fontSize: size.xs,
                                        }}>
                                            {data.keterangan}
                                        </Text>
                                    </View>
                                )}

                                {data.total && (
                                    <View style={{ flexDirection: 'row', marginTop: scaleHeight(.5) }}>
                                        <Text style={{
                                            flex: .5,
                                            color: Color.lightMode.secondary,
                                            fontWeight: 'bold',
                                            fontSize: size.xs,
                                        }}>
                                            Total Diterima
                                        </Text>
                                        <Text style={{
                                            flex: .5,
                                            color: Color.lightMode.secondary,
                                            // fontWeight: 'bold',
                                            fontSize: size.xs,
                                        }}>
                                            {Formatter.rupiah(data.total, "Rp ")}
                                        </Text>
                                    </View>
                                )}

                                <View style={{
                                    marginTop: scaleHeight(2),
                                    width: '100%',
                                    height: scaleHeight(.12),
                                    backgroundColor: Color.lightMode.secondary + 55,
                                }} />
                                < View style={{
                                    flexDirection: 'row',
                                    marginTop: scaleHeight(2),
                                }}>
                                    <View style={{
                                        width: '49%',
                                        padding: scaleWidth(1),
                                    }}>
                                        <Text style={{
                                            color: Color.lightMode.secondary,
                                            fontWeight: 'bold',
                                            fontSize: size.s,
                                            textAlign: 'center',
                                            marginBottom: scaleHeight(1),
                                        }}>
                                            Penerimaan
                                        </Text>
                                        {
                                            data["detail-plus"] && data["detail-plus"].map((item, index) => (
                                                <View key={index} style={{ flexDirection: 'row', marginTop: scaleHeight(.5) }}>
                                                    <Text style={{
                                                        flex: .5,
                                                        color: Color.lightMode.secondary,
                                                        fontWeight: 'bold',
                                                        fontSize: size.xs,
                                                    }}>
                                                        {item.name}
                                                    </Text>
                                                    <Text style={{
                                                        flex: .5,
                                                        color: Color.lightMode.secondary,
                                                        // fontWeight: 'bold',
                                                        fontSize: size.xs,
                                                    }}>
                                                        {Formatter.rupiah(item.nominal ?? 0, "Rp ")}
                                                    </Text>
                                                </View>
                                            ))
                                        }
                                    </View>

                                    <View style={{
                                        backgroundColor: Color.lightMode.secondary + '55',
                                        width: '.3%',
                                    }} />

                                    <View style={{
                                        width: '50%',
                                        padding: scaleWidth(1),
                                        paddingStart: scaleWidth(4),
                                    }}>
                                        <Text style={{
                                            color: Color.lightMode.secondary,
                                            fontWeight: 'bold',
                                            fontSize: size.s,
                                            textAlign: 'center',
                                            marginBottom: scaleHeight(1),
                                        }}>
                                            Potongan
                                        </Text>
                                        {
                                            data["detail-minus"] && data["detail-minus"].map((item, index) => (
                                                <View key={index} style={{ flexDirection: 'row', marginTop: scaleHeight(.5) }}>
                                                    <Text style={{
                                                        flex: .5,
                                                        color: Color.lightMode.secondary,
                                                        fontWeight: 'bold',
                                                        fontSize: size.xs,
                                                    }}>
                                                        {item.name}
                                                    </Text>
                                                    <Text style={{
                                                        flex: .5,
                                                        color: Color.lightMode.secondary,
                                                        // fontWeight: 'bold',
                                                        fontSize: size.xs,
                                                    }}>
                                                        {Formatter.rupiah(item.nominal ?? 0, "Rp ")}
                                                    </Text>
                                                </View>
                                            ))
                                        }
                                    </View>

                                </View>
                            </View>
                        )
                    }
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
        borderRadius: scaleWidth(3),
        borderColor: Theme().color.secondary + 'AA',
        borderWidth: scaleWidth(0.1),
        backgroundColor: Theme().color.neutral,
        padding: scaleHeight(2),
        paddingHorizontal: scaleWidth(5),
    },
});
