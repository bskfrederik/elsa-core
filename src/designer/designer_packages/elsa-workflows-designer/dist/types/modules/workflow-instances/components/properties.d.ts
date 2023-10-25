import { WorkflowInstance } from '../../../models';
import { WorkflowDefinition } from "../../workflow-definitions/models/entities";
export declare class WorkflowDefinitionPropertiesEditor {
  private readonly eventBus;
  private slideOverPanel;
  constructor();
  workflowDefinition?: WorkflowDefinition;
  workflowInstance?: WorkflowInstance;
  private model;
  private selectedTabIndex;
  private changeHandle;
  show(): Promise<void>;
  hide(): Promise<void>;
  onWorkflowDefinitionChanged(): Promise<void>;
  onWorkflowInstanceChanged(): Promise<void>;
  componentWillLoad(): Promise<void>;
  render(): any;
  private createModel;
  private renderPropertiesTab;
  private renderVariablesTab;
  private onSelectedTabIndexChanged;
}
