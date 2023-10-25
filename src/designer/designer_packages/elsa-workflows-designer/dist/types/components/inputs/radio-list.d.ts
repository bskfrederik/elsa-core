import { ActivityInputContext } from "../../services/activity-input-driver";
export declare class RadioList {
  private selectList;
  inputContext: ActivityInputContext;
  private selectedValue?;
  componentWillLoad(): Promise<void>;
  render(): any;
  private getSelectedValue;
  private onCheckChanged;
  private onExpressionChanged;
}
