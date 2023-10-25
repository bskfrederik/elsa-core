import { PanelPosition } from './models';
type ApplyResizeParams = {
  position: PanelPosition;
  isDefault?: boolean;
  isHide?: boolean;
  size?: number;
};
export declare function applyResize({ position, isDefault, isHide, size }: ApplyResizeParams): void;
export {};
