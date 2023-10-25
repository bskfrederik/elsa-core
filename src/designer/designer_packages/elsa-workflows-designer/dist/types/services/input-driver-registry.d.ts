import { ActivityInputDriver, ActivityInputContext } from './activity-input-driver';
export declare class InputDriverRegistry {
  private drivers;
  add(driver: ActivityInputDriver): void;
  get(context: ActivityInputContext): ActivityInputDriver;
}
