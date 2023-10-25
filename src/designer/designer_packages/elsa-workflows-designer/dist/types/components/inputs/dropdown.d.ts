import { ActivityInputContext } from "../../services/activity-input-driver";
export declare class DropdownInput {
  inputContext: ActivityInputContext;
  private selectList;
  componentWillLoad(): Promise<void>;
  render(): any;
  private onChange;
  private onExpressionChanged;
  private getValueOrDefault;
}
