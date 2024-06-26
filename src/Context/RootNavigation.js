import {StackActions} from '@react-navigation/native';
import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params = {}) {
  navigationRef.current?.navigate(name, params);
}
export function replace(name, params = {}) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
  // console.log("navigationRef.current", navigationRef.current)
  // navigationRef.current?.replace(name, params);
}

export function reset() {
  navigationRef.current?.resetRoot();
}
