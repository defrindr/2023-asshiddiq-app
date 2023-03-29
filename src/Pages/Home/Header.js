import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {scaleHeight} from '@utils/Size';
import Theme from '@styles/Theme';
import {scaleWidth} from '../../Utils/Size';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const Icon = ({
  onPress = () => {},
  source = null,
  style = {},
  theme,
  notification = 0,
}) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={styles(theme).iconStyle}>
      {notification > 0 && (
        <View style={styles(theme).notificationContainer}>
          <Text style={styles(theme).notificationText}>{notification}</Text>
        </View>
      )}
      <Image source={source} style={style} />
    </TouchableOpacity>
  );
};

const Header = ({
  theme,
  data = {
    name: null,
    notification: 0,
  },
  onPressScanner = () => {
    console.log('Scanner');
  },
  onPressSearch = () => {
    console.log('Search');
  },
  onPressNotification = () => {
    console.log('Notification');
  },
  onPressBars = () => {
    console.log('Bars');
  },
}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: Theme(theme).color.neutral,
        borderBottomEndRadius: scaleWidth(10),
      }}>
      <LinearGradient
        colors={[Theme(theme).color.primary, Theme(theme).color.primary + '99']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      />
      <View style={styles(theme).overlay}>
        <View
          style={[
            styles(theme).topBarContainer,
            {
              marginBottom: scaleHeight(1),
            },
          ]}>
          <Image
            source={require('@assets/images/logo.png')}
            style={{
              width: scaleWidth(20),
              height: scaleHeight(20 / 3),
              // marginStart: scaleWidth(3),
            }}
            resizeMode="contain"
          />
          {/* <Icon theme={theme} source={require('@assets/images/topbar/scanner.png')} onPress={() => onPressScanner()} /> */}
          <View style={{flexDirection: 'row'}}>
            {/* <Icon theme={theme} source={require('@assets/images/topbar/search.png')} onPress={() => onPressSearch()} /> */}
            <Icon
              notification={data.notification}
              theme={theme}
              source={require('@assets/images/topbar/bell.png')}
              onPress={() => onPressNotification()}
            />
            {/* <Icon theme={theme} source={require('@assets/images/topbar/bars.png')} onPress={() => onPressBars()} /> */}
          </View>
        </View>
        <View style={styles(theme).topBarContainer}>
          {/* <View style={{
                        alignItems: 'center',
                    }}>
                        <Text style={[
                            {
                                color: "#fff",
                            }
                        ]}>Darbe Cash</Text>
                        <Text style={[
                            {
                                color: "#fff",
                                fontWeight: '700',
                            }
                        ]}>Rp 0</Text>
                    </View>
                    <View style={{
                        alignItems: 'center',
                    }}>
                        <Text style={[
                            {
                                color: "#fff",
                            }
                        ]}>Darbe Point</Text>
                        <Text style={[
                            {
                                color: "#fff",
                                fontWeight: '700',
                            }
                        ]}>Rp 0</Text>
                    </View> */}
        </View>
      </View>
    </View>
  );
};

const styles = theme => ({
  overlay: {
    flex: 1,
    width: '100%',
    padding: scaleWidth(1.5),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  topBarContainer: {
    width: '100%',
    flexDirection: 'row',
    padding: scaleWidth(1.5),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scaleHeight(5),
  },
  iconStyle: {
    margin: scaleWidth(1.5),
    marginEnd: scaleWidth(2.5),
  },
  notificationContainer: {
    position: 'absolute',
    top: -scaleWidth(1),
    right: -scaleWidth(2),
    backgroundColor: Theme(theme).color.danger,
    zIndex: 1,
    borderRadius: scaleWidth(10),
    padding: scaleWidth(0.5),
    justifyContent: 'center',
    alignItems: 'center',
    width: scaleWidth(4.5),
    height: scaleWidth(4.5),
  },
  notificationText: {
    color: Theme(theme).color.white,
    fontSize: scaleWidth(3),
    fontWeight: 'bold',
  },
  normalText: {
    color: Theme(theme).color.white,
    fontSize: scaleWidth(3.2),
    fontWeight: 'normal',
    paddingBottom: scaleHeight(1),
  },
  bolderText: {
    color: Theme(theme).color.white,
    fontSize: scaleWidth(5),
    fontWeight: 'bold',
  },
});

export default Header;
