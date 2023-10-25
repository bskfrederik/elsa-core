import { NotificationType } from "./models";
export declare class NotificationTemplate {
  notification: NotificationType;
  time: string;
  private timer;
  connectedCallback(): void;
  disconnectedCallback(): void;
  render(): any;
}
