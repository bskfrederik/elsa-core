import { EventEmitter } from '../../../stencil-public-runtime';
export declare class InputTags {
  fieldId?: string;
  placeHolder?: string;
  values?: Array<string>;
  valueChanged: EventEmitter<Array<string>>;
  private addItem;
  private onInputKeyDown;
  onInputBlur(e: Event): Promise<void>;
  onDeleteTagClick(e: Event, tag: string): Promise<void>;
  render(): any;
}
