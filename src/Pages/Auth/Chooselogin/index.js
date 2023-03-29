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
import Color from '../../../Styles/Color';

export const AuthChooseLogin = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <View>
                        <Image
                            source={require('../../../Assets/images/logo.png')}
                            style={{
                                width: scaleWidth(100),
                                height: scaleWidth(100 / 2),
                            }}
                            resizeMode="contain"
                        />
                    </View>

                    <View style={{
                        backgroundColor: Color.lightMode.white,
                        borderRadius: scaleWidth(2),
                        width: scaleWidth(80),
                        borderColor: Color.lightMode.secondary,
                        borderWidth: scaleWidth(.1),
                        padding: scaleWidth(4),
                    }}>
                        <Text style={{
                            color: Color.lightMode.secondary,
                            fontSize: scaleWidth(4),
                            marginStart: scaleWidth(2),
                            fontWeight: 'bold',
                            marginBottom: scaleHeight(2),
                        }}>Masuk Sebagai ?</Text>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <TouchableOpacity onPress={() => navigation.navigate('app.auth.login-nasabah')} style={{
                                margin: scaleWidth(2),
                                width: '45%',
                                borderColor: Color.lightMode.primary,
                                borderWidth: scaleWidth(.6),
                                borderRadius: scaleWidth(3),
                                alignItems: 'center',
                                padding: scaleWidth(4),
                            }}>
                                <Image source={require('@assets/images/nasabah.png')}
                                    style={{
                                        width: scaleWidth(20),
                                        height: scaleWidth(20),
                                    }}
                                    resizeMode='contain' />
                                <Text style={{ fontSize: scaleWidth(4), fontWeight: 'bold', color: Color.lightMode.primary, textAlign: 'center' }}>
                                    Nasabah
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('app.auth.login-sobat')} style={{
                                margin: scaleWidth(2),
                                width: '45%',
                                borderColor: Color.lightMode.warning,
                                borderWidth: scaleWidth(.6),
                                borderRadius: scaleWidth(3),
                                alignItems: 'center',
                                padding: scaleWidth(4),
                            }}>
                                <Image source={require('@assets/images/sobat.png')}
                                    style={{
                                        width: scaleWidth(20),
                                        height: scaleWidth(20),
                                    }}
                                    resizeMode='contain' />
                                <Text style={{ fontSize: scaleWidth(4), fontWeight: 'bold', color: Color.lightMode.warning, textAlign: 'center' }}>
                                    Sobat
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: scaleHeight(100),
        padding: scaleHeight(5),
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000',
    },
});
