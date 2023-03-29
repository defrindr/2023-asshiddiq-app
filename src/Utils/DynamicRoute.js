import {Alert, Linking} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default function DynamicRoute(myitem) {
  const {type} = myitem.actions;
  if (type === 'nested') {
    if (myitem.actions.items === undefined) {
      Alert.alert('Menu belum tersedia');
    } else {
      Actions.push('app.menu', {
        items: myitem.actions.items,
        title: myitem.title,
      });
    }
  } else {
    const {data: route} = myitem.actions;
    if (type === 'internal') {
      Actions.push(route.route, route.params ?? []);
    } else if (type === 'external') {
      // redirect to browser
      Linking.openURL(route.url);
    } else {
      Alert.alert('Error', 'Unknown action type');
    }
  }
}
