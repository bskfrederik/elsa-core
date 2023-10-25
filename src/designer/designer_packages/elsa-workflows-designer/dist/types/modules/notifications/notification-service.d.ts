import { NotificationType } from "./models";
export default class NotificationService {
  constructor();
  static toggleNotification: () => void;
  static createNotification: (notification: NotificationType) => NotificationType;
  static updateNotification: (notification: NotificationType, newNotifFields: NotificationType) => void;
  static hideToast: (notification: NotificationType) => void;
  static hideAllNotifications: () => void;
}
