import { ActivityInputContext } from "../../../../services/activity-input-driver";
export declare class VariablePickerInput {
  inputContext: ActivityInputContext;
  private workflowDefinitions;
  componentWillLoad(): Promise<void>;
  render(): any;
  private onChange;
}
