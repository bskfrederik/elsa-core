import { ActivityInputContext } from "../../../services/activity-input-driver";
import { WorkflowContextProviderDescriptor } from "../services/api";
import { WorkflowDefinition } from "../../workflow-definitions/models/entities";
export declare class ProviderTypePicker {
  inputContext: ActivityInputContext;
  descriptors: Array<WorkflowContextProviderDescriptor>;
  workflowDefinition: WorkflowDefinition;
  render(): any;
  private onChange;
  private onExpressionChanged;
}
