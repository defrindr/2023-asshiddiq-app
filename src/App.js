/**
 * Boilerplate code for React Native
 * @AUTHOR Defri Indra M
 * @EMAIL defrindr@gmail.com
 **/

import Routes from '@routes';
import type {Node} from 'react';
import {useEffect} from 'react';

import Theme from '@styles/Theme';
import {Alert, Platform, StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ToastMessage} from '@components/Toast';
import Toast from '@utils/Toast';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';

import messaging from '@react-native-firebase/messaging';
import Url from '@config/Url';
import Request from '@utils/Request';
import AppLayout from './Wrapper/AppLayout';
import ThemeWrapper from './Wrapper/ThemeWrapper';

/**
 * * ===========================
 * * BEGIN REALTIME REPORT ERROR
 * * ===========================
 */

// const errorHandler = (e, isFatal) => {
//   // hit ERROR_LOG
//   Request.FPost(Url.API.GUEST.LOG_ERROR.INDEX, {
//     type: 'js',
//     error: e,
//     isFatal: isFatal,
//   })
//     .then(response => {
//       console.log(response);
//     })
//     .catch(error => {
//       console.log(error);
//     });

//   if (isFatal) {
//     Alert.alert(
//       'Unexpected error occurred',
//       `Error: ${isFatal ? 'Fatal:' : ''} ${e.name} ${e.message}` +
//       '\n\nWe have reported this to our team ! Please close the app and start again!',
//       [
//         {
//           text: 'Close',
//         },
//       ],
//     );
//   } else {
//     console.log(e); // So that we can see it in the ADB logs in case of Android if needed
//   }
// };
// setJSExceptionHandler(errorHandler, true);
// setNativeExceptionHandler(errorString => {
//   Request.FPost(Url.API.GUEST.LOG_ERROR.INDEX, {
//     type: 'native',
//     errorString,
//   })
//     .then(response => {
//       console.log(response);
//     })
//     .catch(error => {
//       console.log(error);
//     });

//   console.log('setNativeExceptionHandler', errorString);
// });

/**
 * * =========================
 * * END REALTIME REPORT ERROR
 * * =========================
 */

/**
 * * ===========================
 * * BEGIN REALTIME NOTIFICATION
 * * ===========================
 */

// Check whether an initial notification is available
messaging()
  .getInitialNotification()
  .then(remoteMessage => {
    if (remoteMessage) {
      console.log(
        'Notification caused app to open from quit state:',
        remoteMessage.notification,
      );
    }
  });

// IOS need to request permission
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

/**
 * * =========================
 * * END REALTIME NOTIFICATION
 * * =========================
 */

const AppWrapper: () => Node = () => {
  // Firebase Notification
  useEffect(() => {
    if (Platform.OS === 'ios') {
      requestUserPermission();
    }

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      try {
        console.log('A new FCM message arrived!', remoteMessage);
        Toast.success(
          remoteMessage.notification.title,
          remoteMessage.notification.body,
        );
      } catch (error) {
        console.log(Toast);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AppLayout>
      <ThemeWrapper>
        <Routes />
        <ToastMessage />
      </ThemeWrapper>
    </AppLayout>
  );
};
export default AppWrapper;
