import { WorkflowInstance } from "../../../models";
import { WorkflowInstanceViewerInstance } from "./viewer-instance";
import { WorkflowDefinition } from "../../workflow-definitions/models/entities";
export declare class WorkflowInstanceViewerService {
  show: (workflowDefinition: WorkflowDefinition, workflowInstance: WorkflowInstance) => WorkflowInstanceViewerInstance;
}
