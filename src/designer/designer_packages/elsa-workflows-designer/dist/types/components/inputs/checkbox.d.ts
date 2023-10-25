import { ActivityInputContext } from "../../services/activity-input-driver";
export declare class Checkbox {
  inputContext: ActivityInputContext;
  private isChecked?;
  componentWillLoad(): Promise<void>;
  private getSelectedValue;
  render(): any;
  private onPropertyEditorChanged;
  private onExpressionChanged;
}
