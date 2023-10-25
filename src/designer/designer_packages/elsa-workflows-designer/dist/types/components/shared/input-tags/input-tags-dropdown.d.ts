import { EventEmitter } from '../../../stencil-public-runtime';
import { SelectListItem } from '../../../models';
export declare class InputTagsDropdown {
  fieldName?: string;
  fieldId?: string;
  placeHolder?: string;
  values?: Array<string | SelectListItem>;
  dropdownValues?: Array<SelectListItem>;
  valueChanged: EventEmitter<SelectListItem[] | string[]>;
  currentValues?: Array<SelectListItem>;
  private valuesChangedHandler;
  componentWillLoad(): void;
  private updateCurrentValues;
  private onTagSelected;
  onDeleteTagClick(e: any, currentTag: SelectListItem): Promise<void>;
  render(): any;
}
