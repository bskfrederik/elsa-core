import 'reflect-metadata';
export type ActivityType = string;
export type ActivityIconProducer = (ActivityIconSettings?: any) => any;
export declare class ActivityIconRegistry {
  private iconMap;
  constructor();
  add(activityType: ActivityType, icon: ActivityIconProducer): void;
  get(activityType: ActivityType): ActivityIconProducer;
  getOrDefault(activityType: ActivityType): ActivityIconProducer;
  has(activityType: string): boolean;
}
