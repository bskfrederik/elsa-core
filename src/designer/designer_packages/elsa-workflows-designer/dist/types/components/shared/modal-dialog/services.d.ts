import 'reflect-metadata';
import { ModalDialogInstance, ShowModalDialogOptions } from "./models";
export declare class ModalDialogService {
  show(content: () => any, options?: ShowModalDialogOptions): ModalDialogInstance;
  hide(instance: ModalDialogInstance): void;
}
