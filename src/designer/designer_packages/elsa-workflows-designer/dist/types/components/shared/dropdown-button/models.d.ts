export declare enum DropdownButtonOrigin {
  TopLeft = 0,
  TopRight = 1
}
export interface DropdownButtonItem {
  name?: string;
  value?: any;
  text: string;
  isSelected?: boolean;
  handler?: () => void;
  order?: number;
  group?: number;
}
