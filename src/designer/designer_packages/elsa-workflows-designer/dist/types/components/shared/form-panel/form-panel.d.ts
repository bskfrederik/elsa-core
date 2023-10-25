import { EventEmitter } from '../../../stencil-public-runtime';
import { TabChangedArgs, TabDefinition } from '../../../models';
import { PanelActionClickArgs, PanelActionDefinition } from "./models";
export declare class FormPanel {
  mainTitle: string;
  subTitle: string;
  isReadonly: boolean;
  orientation: 'Landscape' | 'Portrait';
  tabs: Array<TabDefinition>;
  selectedTabIndex?: number;
  actions: Array<PanelActionDefinition>;
  submitted: EventEmitter<FormData>;
  selectedTabIndexChanged: EventEmitter<TabChangedArgs>;
  actionInvoked: EventEmitter<PanelActionClickArgs>;
  render(): any;
  private onTabClick;
  private onSubmit;
  private renderPanel;
}
