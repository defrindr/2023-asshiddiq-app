import {ActivityIndicator, View} from 'react-native';
import Theme from '../Styles/Theme';

export default function Loading({loadingState = false, withIndicator = true}) {
  return (
    <>
      {loadingState && (
        <View
          style={{
            zIndex: 9999,
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: Theme().color.dark + '33',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          {withIndicator && (
            <ActivityIndicator
              size={Theme().size.m}
              color={Theme().color.neutral}
            />
          )}
        </View>
      )}
    </>
  );
}
