import Layout from '@styles/Layout';
import Theme from '@styles/Theme';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 48 : 0;

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

const AppLayout = ({children}) => {
  return (
    <>
      <View
        style={[
          Layout().fill,
          {
            backgroundColor: Theme().color.neutral,
          },
        ]}>
        <MyStatusBar
          backgroundColor={Theme().color.primary}
          barStyle="light-content"
        />
        <View style={styles.appBar} />
        {children}
        <View style={styles.bottomBar} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: Theme().color.primary,
    height: APPBAR_HEIGHT,
  },
  bottomBar: {
    height: APPBAR_HEIGHT - 15,
    backgroundColor: Theme().color.primary,
  },
});

export default AppLayout;
