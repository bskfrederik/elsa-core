export declare enum ActivityIconSize {
  Small = 0,
  Medium = 1,
  Large = 2
}
export interface ActivityIconSettings {
  size?: ActivityIconSize;
}
export declare function getActivityIconCssClass(settings: ActivityIconSettings): string;
