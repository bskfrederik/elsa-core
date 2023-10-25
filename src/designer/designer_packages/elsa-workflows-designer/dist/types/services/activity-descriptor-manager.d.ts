import 'reflect-metadata';
export declare class ActivityDescriptorManager {
  private readonly elsaClientProvider;
  private activityDescriptorsUpdatedCallback;
  constructor();
  onActivityDescriptorsUpdated(callback: () => void): void;
  refresh(): Promise<void>;
}
