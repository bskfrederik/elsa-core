import NotificationService from './notification-service';
export declare class NotificationManager {
  modalState: boolean;
  onModalStateChange(value: any): void;
  private readonly eventBus;
  modal: HTMLElement;
  overlay: HTMLElement;
  static NotificationServiceLocal: typeof NotificationService;
  deleteNotif: (id: any) => void;
  handleToggle: () => void;
  private closeMenu;
  private toggleMenu;
  render(): any;
}
