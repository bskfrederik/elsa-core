import { r as registerInstance, h } from './index-dc0ae4f5.js';
import { s as state } from './notification-store-40f3cb5a.js';
import './index-4ac684d0.js';

const ToastManager = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    const { notifications } = state;
    const notification = notifications.find(notification => notification.showToast !== false);
    if (notification) {
      return (h("elsa-toast-notification", { notification: notification }));
    }
    else {
      return null;
    }
  }
};

export { ToastManager as elsa_toast_manager };

//# sourceMappingURL=elsa-toast-manager.entry.js.map