export interface PanelActionClickArgs {
  e: Event;
  action: PanelActionDefinition;
}
export interface PanelActionDefinition {
  text: string;
  name?: string;
  isPrimary?: boolean;
  isDangerous?: boolean;
  type?: PanelActionType;
  onClick?: (args: PanelActionClickArgs) => void;
  display?: (button: PanelActionDefinition) => any;
}
export declare enum PanelActionType {
  Button = 0,
  Submit = 1,
  Cancel = 2
}
