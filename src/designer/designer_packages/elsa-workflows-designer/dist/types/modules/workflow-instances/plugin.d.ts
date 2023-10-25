import 'reflect-metadata';
import { Plugin } from "../../models";
export declare class WorkflowInstancesPlugin implements Plugin {
  private readonly eventBus;
  private readonly workflowDefinitionsApi;
  private readonly workflowInstancesApi;
  private readonly modalDialogService;
  private workflowInstanceBrowserInstance;
  constructor();
  initialize(): Promise<void>;
  private showWorkflowInstanceViewer;
  private onBrowseWorkflowInstances;
  private onWorkflowInstanceSelected;
}
