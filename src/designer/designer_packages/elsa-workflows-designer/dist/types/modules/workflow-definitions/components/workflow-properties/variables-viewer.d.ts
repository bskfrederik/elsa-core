import { Variable, WorkflowInstance } from "../../../../models";
import { WorkflowDefinition } from "../../models/entities";
export declare class VariablesViewer {
  variables?: Array<Variable>;
  workflowDefinition: WorkflowDefinition;
  workflowInstance: WorkflowInstance;
  render(): any;
  private getVariableValue;
}
