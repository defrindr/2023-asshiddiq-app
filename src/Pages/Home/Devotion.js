import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import Theme from '@styles/Theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import {scaleWidth} from '@utils/Size';

const Devotion = ({
  onBookmark = () => {},
  onClose = () => {},
  active = false,
  data = null,
  theme,
}) => {
  if (data === null) {
    active = false;
  }

  return (
    <Modal animationType="slide" transparent={true} visible={active}>
      {data !== null && (
        <View
          style={{
            flex: 1,
            backgroundColor: Theme(theme).color.black + 'EE',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{uri: data.image}}
              style={{
                width: scaleWidth(75),
                height: scaleWidth(75),
                borderRadius: scaleWidth(2),
              }}
              resizeMode="contain"
            />
            <View
              style={{
                paddingTop: scaleWidth(5),
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => onBookmark()}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: scaleWidth(1),
                  margin: scaleWidth(1),
                  marginEnd: scaleWidth(10),
                  backgroundColor: 'transparent',
                  borderRadius: scaleWidth(100),
                  borderColor: Theme(theme).color.white,
                }}>
                <Icon
                  name="bookmark"
                  size={scaleWidth(6)}
                  color={Theme(theme).color.white}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onClose()}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: scaleWidth(1),
                  margin: scaleWidth(1),
                  height: scaleWidth(8),
                  width: scaleWidth(8),
                  backgroundColor: 'transparent',
                  borderRadius: scaleWidth(100),
                  borderColor: Theme(theme).color.white,
                  borderWidth: scaleWidth(0.6),
                }}>
                <Icon
                  name="close"
                  size={scaleWidth(4)}
                  color={Theme(theme).color.white}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Modal>
  );
};

export default Devotion;
