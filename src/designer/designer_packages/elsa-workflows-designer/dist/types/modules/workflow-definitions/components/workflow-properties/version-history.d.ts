import { Event, EventEmitter } from '../../../../stencil-public-runtime';
import { WorkflowDefinition } from "../../models/entities";
export declare class WorkflowDefinitionVersionHistory {
  private readonly eventBus;
  private readonly workflowDefinitionApi;
  private readonly modalDialogService;
  constructor();
  selectedVersion: WorkflowDefinition;
  workflowVersions: Array<WorkflowDefinition>;
  serverUrl: string;
  versionSelected: EventEmitter<WorkflowDefinition>;
  deleteVersionClicked: EventEmitter<WorkflowDefinition>;
  revertVersionClicked: EventEmitter<WorkflowDefinition>;
  onViewVersionClick: (e: Event, version: WorkflowDefinition) => void;
  onDeleteVersionClick: (e: Event, version: WorkflowDefinition) => Promise<void>;
  onRevertVersionClick: (e: Event, version: WorkflowDefinition) => void;
  render(): any;
}
