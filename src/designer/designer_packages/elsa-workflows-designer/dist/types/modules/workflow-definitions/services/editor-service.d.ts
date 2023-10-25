import { WorkflowDefinition } from "../models/entities";
import { WorkflowDefinitionEditorInstance } from "./editor-instance";
export declare class WorkflowDefinitionEditorService {
  show: (workflowDefinition: WorkflowDefinition) => WorkflowDefinitionEditorInstance;
}
