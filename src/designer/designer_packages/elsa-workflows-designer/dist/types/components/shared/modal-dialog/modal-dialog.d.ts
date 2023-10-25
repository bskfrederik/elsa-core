import { EventEmitter } from '../../../stencil-public-runtime';
import { ModalActionClickArgs, ModalActionDefinition, ModalDialogInstance } from "./models";
import { ModalType } from "./modal-type";
export declare class ModalDialog {
  private overlay;
  private modal;
  modalDialogInstance: ModalDialogInstance;
  actions: Array<ModalActionDefinition>;
  size: string;
  type: ModalType;
  autoHide: boolean;
  content: () => any;
  shown: EventEmitter;
  hidden: EventEmitter;
  actionInvoked: EventEmitter<ModalActionClickArgs>;
  private isVisible;
  element: any;
  show(animate?: boolean): Promise<void>;
  hide(animate?: boolean): Promise<void>;
  handleDefaultClose: () => Promise<void>;
  showInternal(animate: boolean): void;
  hideInternal(animate: boolean): void;
  handleKeyDown(e: KeyboardEvent): Promise<void>;
  componentDidRender(): void;
  render(): any;
}
