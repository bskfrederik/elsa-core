import { EventEmitter } from '../../../stencil-public-runtime';
import { TabDefinition } from '../../../models';
import { PanelActionDefinition } from "../../shared/form-panel/models";
export declare class SlideOverPanel {
  private overlayElement;
  private formElement;
  headerText: string;
  tabs: Array<TabDefinition>;
  selectedTab?: TabDefinition;
  actions: Array<PanelActionDefinition>;
  expand: boolean;
  collapsed: EventEmitter;
  show(): Promise<void>;
  hide(): Promise<void>;
  isHiding: boolean;
  isShowing: boolean;
  isVisible: boolean;
  private handleExpanded;
  render(): any;
  private onCloseClick;
  private onOverlayClick;
  private onTransitionEnd;
  private onTabClick;
  private renderPanel;
}
