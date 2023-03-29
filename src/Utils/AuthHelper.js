import AsyncStorage from '@react-native-async-storage/async-storage';
import MyStorage from '@config/Storage';

/**
 * Get auth data from storage, and parse it to object
 * @returns {Promise<null|object>} auth data
 */
const getAuthData = async () => {
  try {
    const authData = await AsyncStorage.getItem(MyStorage.AUTH);
    return JSON.parse(authData);
  } catch (e) {
    console.log(e);
  }
};

/**
 * Prepare auth data to be saved to storage
 * @param {*} data
 * @returns
 */
const prepareAuthData = async data => {
  try {
    let result = {
      user: data,
      token: data.secret_token,
      refreshToken: data.refresh_token,
      expiredAt: data.expired_at,
    };

    return result;
  } catch (e) {
    console.log(e);
  }
};

/**
 * Set auth data to storage, and stringify it to string
 * @param {*} data
 */
const setAuthData = async data => {
  try {
    const dataLogin = await prepareAuthData(data);
    // console.log(dataLogin)
    await AsyncStorage.setItem(MyStorage.AUTH, JSON.stringify(dataLogin));
  } catch (e) {
    console.log(e);
  }
};

/**
 * Remove auth data from storage
 */
const removeAuthData = async () => {
  try {
    await AsyncStorage.removeItem(MyStorage.AUTH);
  } catch (e) {
    console.log(e);
  }
};

const isLogin = async () => {
  try {
    const authData = await AsyncStorage.getItem(MyStorage.AUTH);
    return authData !== null;
  } catch (e) {
    console.log(e);
  }
};

export default {
  prepareAuthData,
  getAuthData,
  setAuthData,
  removeAuthData,
  isLogin,
};
