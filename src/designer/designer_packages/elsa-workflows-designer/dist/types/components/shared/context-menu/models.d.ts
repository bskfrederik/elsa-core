export interface ContextMenuItem {
  text: string;
  anchorUrl?: string;
  handler?: (e: MouseEvent) => void;
  icon?: any;
  isToggle?: boolean;
  checked?: boolean;
  order?: number;
  group?: string;
}
export declare enum ContextMenuAnchorPoint {
  TopLeft = 0,
  TopRight = 1,
  BottomLeft = 2,
  BottomRight = 3
}
