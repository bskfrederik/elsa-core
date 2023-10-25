import { NotificationType } from "./models";
export declare class ToastNotification {
  notification: NotificationType;
  showDuration: number;
  private timer;
  componentDidRender(): void;
  handleClick: () => void;
  disconnectedCallback(): void;
  hideToast: () => void;
  render(): any;
}
