import { EventEmitter } from '../../../stencil-public-runtime';
import { DropdownButtonItem, DropdownButtonOrigin } from "./models";
export declare class DropdownButton {
  text: string;
  icon?: any;
  handler?: () => void;
  origin: DropdownButtonOrigin;
  items: Array<DropdownButtonItem>;
  theme: ('Primary' | 'Secondary');
  disabled: boolean;
  itemSelected: EventEmitter<DropdownButtonItem>;
  menuOpened: EventEmitter<void>;
  private contextMenu;
  private element;
  render(): any;
  private renderMenu;
  private renderItems;
  private renderIcon;
  private closeContextMenu;
  private toggleMenu;
  private getOriginClass;
  private onItemClick;
  private onWindowClicked;
}
