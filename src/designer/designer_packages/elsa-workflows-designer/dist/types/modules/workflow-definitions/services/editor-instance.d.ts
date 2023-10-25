import { WorkflowDefinition } from "../models/entities";
export declare class WorkflowDefinitionEditorInstance {
  private readonly workflowDefinition;
  private readonly api;
  private readonly activityDescriptorManager;
  private readonly workflowDefinitionManager;
  private readonly workflowDefinitionEditorService;
  private workflowDefinitionEditorElement;
  constructor(workflowDefinition: WorkflowDefinition);
  private import;
  private onPublishClicked;
  private onUnPublishClicked;
  private onExportClicked;
  private onImportClicked;
  private onWorkflowUpdated;
  saveWorkflowDefinition: (definition: WorkflowDefinition, publish: boolean) => Promise<WorkflowDefinition>;
  private updateCompositeActivityReferences;
}
