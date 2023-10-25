import { ActivityInputContext } from "../../services/activity-input-driver";
import { WorkflowDefinition } from "../../modules/workflow-definitions/models/entities";
export declare class VariablePickerInput {
  inputContext: ActivityInputContext;
  workflowDefinition: WorkflowDefinition;
  render(): any;
  private onChange;
}
