import { WorkflowDefinition } from "../models/entities";
import { VersionOptions } from "../../../models";
export declare class WorkflowDefinitionManager {
  private readonly api;
  private readonly activityDescriptorManager;
  constructor();
  getWorkflow: (definitionId: string, versionOptions: VersionOptions) => Promise<WorkflowDefinition>;
  saveWorkflow: (definition: WorkflowDefinition, publish: boolean) => Promise<WorkflowDefinition>;
  retractWorkflow: (definition: WorkflowDefinition) => Promise<WorkflowDefinition>;
  exportWorkflow: (definition: WorkflowDefinition) => Promise<void>;
  importWorkflow: (definitionId: string, file: File) => Promise<WorkflowDefinition>;
}
