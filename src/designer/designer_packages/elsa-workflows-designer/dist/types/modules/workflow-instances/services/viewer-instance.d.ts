import { WorkflowInstance } from "../../../models";
import { WorkflowDefinition } from "../../workflow-definitions/models/entities";
export declare class WorkflowInstanceViewerInstance {
  private workflowDefinition;
  private workflowInstance;
  private workflowInstanceViewerElement;
  constructor(workflowDefinition: WorkflowDefinition, workflowInstance: WorkflowInstance);
}
