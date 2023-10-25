import notificationService from '../../../modules/notifications/notification-service';
export declare class WorkflowToolbar {
  private readonly eventBus;
  private readonly packagesApi;
  private currentElsaVersion;
  static NotificationService: typeof notificationService;
  constructor();
  componentWillLoad(): Promise<string>;
  onNotificationClick: (e: any) => Promise<void>;
  render(): any;
}
