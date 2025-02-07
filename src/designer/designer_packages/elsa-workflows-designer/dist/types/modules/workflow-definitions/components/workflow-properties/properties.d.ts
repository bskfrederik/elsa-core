import { EventEmitter } from '../../../../stencil-public-runtime';
import { WorkflowDefinition } from "../../models/entities";
import { WorkflowDefinitionPropsUpdatedArgs } from "../../models/ui";
export declare class WorkflowDefinitionPropertiesEditor {
  private readonly eventBus;
  private slideOverPanel;
  private readonly workflowDefinitionApi;
  constructor();
  workflowDefinition?: WorkflowDefinition;
  workflowVersions: Array<WorkflowDefinition>;
  readonly: boolean;
  workflowPropsUpdated: EventEmitter<WorkflowDefinitionPropsUpdatedArgs>;
  versionSelected: EventEmitter<WorkflowDefinition>;
  deleteVersionClicked: EventEmitter<WorkflowDefinition>;
  revertVersionClicked: EventEmitter<WorkflowDefinition>;
  private model;
  private selectedTabIndex;
  show(): Promise<void>;
  hide(): Promise<void>;
  onWorkflowDefinitionChanged(): Promise<void>;
  onWorkflowVersionsChanged(): Promise<void>;
  componentWillLoad(): Promise<void>;
  render(): any;
  private createModel;
  private renderPropertiesTab;
  private renderVariablesTab;
  private renderInputOutputTab;
  private renderVersionHistoryTab;
  private onSelectedTabIndexChanged;
  private onPropertyEditorChanged;
  private onVariablesUpdated;
  private onInputsUpdated;
  private onOutputsUpdated;
  private onOutcomesUpdated;
  private onPropsUpdated;
  private onWorkflowDefinitionUpdated;
  private getPropEditorSectionByPropName;
}
