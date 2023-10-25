import { ActivityInputContext } from "../../services/activity-input-driver";
export declare class CheckList {
  private selectList;
  inputContext: ActivityInputContext;
  private selectedValues?;
  private selectedValue?;
  componentWillLoad(): Promise<void>;
  render(): any;
  private getSelectedValues;
  private getValueOrDefault;
  private onCheckChanged;
  private onExpressionChanged;
}
