import moment from 'moment';
import notificationStore from "./notification-store";
import { NotificationDisplayType } from "./models";
export default class NotificationService {
  constructor() {
  }
}
NotificationService.toggleNotification = () => {
  notificationStore.infoPanelBoolean = !notificationStore.infoPanelBoolean;
};
NotificationService.createNotification = (notification) => {
  notification.timestamp = moment().clone();
  notificationStore.notifications = [notification, ...notificationStore.notifications];
  return notification;
};
NotificationService.updateNotification = (notification, newNotifFields) => {
  const notifIndex = notificationStore.notifications.findIndex(item => item.id === notification.id);
  const updatedNotification = Object.assign({}, notificationStore.notifications[notifIndex]);
  updatedNotification.title = newNotifFields.title;
  updatedNotification.text = newNotifFields.text;
  updatedNotification.type = newNotifFields.type || NotificationDisplayType.Success;
  updatedNotification.timestamp = moment().clone();
  const filtered = notificationStore.notifications.filter(item => item.id !== notification.id);
  notificationStore.notifications = [updatedNotification, ...filtered];
};
NotificationService.hideToast = (notification) => {
  const index = notificationStore.notifications.findIndex(item => item.id === notification.id);
  if (notificationStore.notifications[index].showToast !== false) {
    const notifications = [...notificationStore.notifications];
    notifications[index] = Object.assign(Object.assign({}, notifications[index]), { showToast: false });
    notificationStore.notifications = notifications;
  }
};
NotificationService.hideAllNotifications = () => {
  notificationStore.infoPanelBoolean = false;
  notificationStore.notifications = notificationStore.notifications.map((notification) => {
    if (notification.showToast !== false) {
      return Object.assign(Object.assign({}, notification), { showToast: false });
    }
    return notification;
  });
};
//# sourceMappingURL=notification-service.js.map
