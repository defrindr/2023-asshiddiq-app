import {Text, TouchableOpacity, View, useColorScheme} from 'react-native';
import Theme from '@styles/Theme';
import LinearGradient from 'react-native-linear-gradient';

export default function HomeTabBar({state, descriptors, navigation}) {
  const theme = useColorScheme();
  return (
    <View
      style={{
        backgroundColor: Theme(theme).color.neutral,
        // borderTopStartRadius: Theme(theme).size.sm,
        // borderTopEndRadius: Theme(theme).size.sm,

        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        paddingBottom: Theme(theme).size.xs2,
        flexDirection: 'row',
        position: 'relative',
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
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
              margin: 3,
              padding: Theme(theme).size.xs2 * 1.1,
              // backgroundColor: '#000',
              // borderEndColor: '#fff',
              // borderEndWidth: 1,
            }}>
            {
              // icon
              options.tabBarIcon &&
                options.tabBarIcon({
                  size: Theme(theme).size.m,
                  focused: isFocused,
                  color: isFocused ? '#ddd' : '#fff',
                })
            }
            <Text
              style={{
                color: isFocused ? '#ddd' : '#fff',
                fontSize: Theme(theme).size.xs,
                fontWeight: '700',
                textAlign: 'center',
              }}>
              {label.toUpperCase()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
