import { h } from '@stencil/core';
import notificationStore from "./notification-store";
export class ToastManager {
  render() {
    const { notifications } = notificationStore;
    const notification = notifications.find(notification => notification.showToast !== false);
    if (notification) {
      return (h("elsa-toast-notification", { notification: notification }));
    }
    else {
      return null;
    }
  }
  static get is() { return "elsa-toast-manager"; }
}
//# sourceMappingURL=toast-manager.js.map
