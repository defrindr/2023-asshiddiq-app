import ToastMessage from '@components/Toast';

class Toast {
  show = (type, title, message) => {
    ToastMessage.show(type, title, message);
  };

  success = (title, message = '') => {
    this.show('success', title, message);
  };

  error = (title, message = '') => {
    this.show('error', title, message);
  };
}

export default new Toast();
