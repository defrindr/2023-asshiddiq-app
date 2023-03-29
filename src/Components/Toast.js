import {scaleWidth} from '@utils/Size';
import ToastBase from 'react-native-toast-message';

export const ToastMessage = () => {
  return (
    <ToastBase
      topOffset={scaleWidth(10)}
      bottomOffset={scaleWidth(10)}
      position="bottom"
      autoHide={true}
      autoHideDelay={3000}
    />
  );
};

const Toast = {
  show: (type, title, message) => {
    ToastBase.show({
      type,
      text1: title,
      text2: message,
    });
  },
};

export default Toast;
