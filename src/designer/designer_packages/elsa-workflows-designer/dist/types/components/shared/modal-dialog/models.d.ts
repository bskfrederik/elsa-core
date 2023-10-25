import { ModalType } from "./modal-type";
export interface ModalDialogInstance {
  content: () => any;
  options?: ShowModalDialogOptions;
  modalDialogRef?: HTMLElement;
  modalDialogContentRef?: HTMLElement;
  actionInvoked?: (args: ModalActionClickArgs) => void;
}
export interface ModalActionClickArgs {
  e: Event;
  action: ModalActionDefinition;
  instance: ModalDialogInstance;
}
export interface ModalActionDefinition {
  text: string;
  name?: string;
  isPrimary?: boolean;
  isDangerous?: boolean;
  type?: ModalActionType;
  onClick?: (args: ModalActionClickArgs) => void;
  display?: (button: ModalActionDefinition) => any;
}
export declare enum ModalActionType {
  Button = 0,
  Submit = 1,
  Cancel = 2
}
export interface ShowModalDialogOptions {
  actions?: Array<ModalActionDefinition>;
  modalType?: ModalType;
  autoHide?: boolean;
  size?: string;
}
export declare class DefaultModalActions {
  static Cancel: (handler?: (args: ModalActionClickArgs) => void) => ModalActionDefinition;
  static Close: (handler?: (args: ModalActionClickArgs) => void) => ModalActionDefinition;
  static Save: (handler?: (args: ModalActionClickArgs) => void) => ModalActionDefinition;
  static Delete: (handler?: (args: ModalActionClickArgs) => void) => ModalActionDefinition;
  static Publish: (handler?: (args: ModalActionClickArgs) => void) => ModalActionDefinition;
  static Unpublish: (handler?: (args: ModalActionClickArgs) => void) => ModalActionDefinition;
  static New: (handler?: (args: ModalActionClickArgs) => void) => ModalActionDefinition;
  static Yes: (handler?: (args: ModalActionClickArgs) => void) => ModalActionDefinition;
}
