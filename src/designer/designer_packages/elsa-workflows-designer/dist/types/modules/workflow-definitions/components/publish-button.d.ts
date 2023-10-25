import { EventEmitter } from '../../../stencil-public-runtime';
export interface PublishClickedArgs {
  begin: () => void;
  complete: () => void;
}
export declare class PublishButton {
  publishing: boolean;
  disabled: boolean;
  newClicked: EventEmitter;
  publishClicked: EventEmitter<PublishClickedArgs>;
  unPublishClicked: EventEmitter;
  exportClicked: EventEmitter;
  importClicked: EventEmitter<File>;
  menu: HTMLElement;
  element: HTMLElement;
  private onPublishClick;
  private onUnPublishClick;
  private onExportClick;
  private onImportClick;
  private publishingIcon;
  render(): any;
}
