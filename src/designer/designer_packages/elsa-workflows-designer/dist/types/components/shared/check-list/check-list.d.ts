import { EventEmitter } from '../../../stencil-public-runtime';
import { SelectList } from "../../../models";
export declare class CheckList {
  selectList: SelectList;
  selectedValues?: Array<string>;
  selectedValue?: number;
  fieldName: string;
  selectedValuesChanged: EventEmitter<Array<string> | number>;
  render(): any;
  private getSelectedValues;
  private onCheckChanged;
}
