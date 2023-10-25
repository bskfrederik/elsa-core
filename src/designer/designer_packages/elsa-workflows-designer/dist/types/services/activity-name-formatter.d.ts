import { Activity, ActivityDescriptor } from "../models";
export type ActivityNameStrategy = (context: ActivityNameFormatterContext) => string;
export interface ActivityNameFormatterContext {
  activityDescriptor: ActivityDescriptor;
  count: number;
  activities: Array<Activity>;
}
export declare class ActivityNameFormatter {
  static readonly DefaultStrategy: ActivityNameStrategy;
  static readonly UnderscoreStrategy: ActivityNameStrategy;
  static readonly PascalCaseStrategy: ActivityNameStrategy;
  static readonly CamelCaseStrategy: ActivityNameStrategy;
  static readonly SnakeCaseStrategy: ActivityNameStrategy;
  static readonly KebabCaseStrategy: ActivityNameStrategy;
  strategy: ActivityNameStrategy;
  format(context: ActivityNameFormatterContext): string;
}
