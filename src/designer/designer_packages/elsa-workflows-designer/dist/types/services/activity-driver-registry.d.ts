import 'reflect-metadata';
import { ActivityDriver, ActivityDriverFactory } from "./activity-driver";
export declare class ActivityDriverRegistry {
  private driverMap;
  private defaultDriverFactory;
  add(activityType: string, driverFactory: ActivityDriverFactory): void;
  get(activityType: string): ActivityDriverFactory;
  createDriver(activityType: string): ActivityDriver;
}
