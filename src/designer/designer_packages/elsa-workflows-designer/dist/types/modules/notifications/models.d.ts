import { Moment } from "moment";
export interface NotificationType {
  id?: number | any;
  title: string;
  text: string | any;
  type?: NotificationDisplayType;
  timestamp?: Moment;
  showToast?: boolean;
}
export declare enum NotificationDisplayType {
  Success = 0,
  Warning = 1,
  Error = 2,
  InProgress = 3
}
