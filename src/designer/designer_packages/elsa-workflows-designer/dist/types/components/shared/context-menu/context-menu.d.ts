import { ContextMenuAnchorPoint, ContextMenuItem } from "./models";
export declare class ContextMenu {
  menuItems: Array<ContextMenuItem>;
  hideButton: boolean;
  anchorPoint: ContextMenuAnchorPoint;
  contextMenu: HTMLElement;
  element: HTMLElement;
  open(): Promise<void>;
  close(): Promise<void>;
  private onWindowClicked;
  private showContextMenu;
  private closeContextMenu;
  private toggleMenu;
  private onMenuItemClick;
  private getAnchorPointClass;
  render(): any;
  renderMenuItemGroups: (menuItemGroups: Array<any>) => any;
  renderMenuItems: (menuItems: Array<ContextMenuItem>) => any;
  renderButton: () => any;
}
