import { EventEmitter } from "../../../stencil-public-runtime";
import { WorkflowExecutionLogRecord } from "../../../models";
import { ActivityNode } from "../../../services";
import { ActivityExecutionEventBlock, WorkflowJournalModel } from "../models";
import { JournalItemSelectedArgs } from "../events";
export declare class Journal {
  private readonly iconRegistry;
  private readonly workflowInstancesApi;
  constructor();
  model: WorkflowJournalModel;
  workflowExecutionLogRecords: Array<WorkflowExecutionLogRecord>;
  blocks: Array<ActivityExecutionEventBlock>;
  rootBlocks: Array<ActivityExecutionEventBlock>;
  expandedBlocks: Array<ActivityExecutionEventBlock>;
  journalActivityMap: Set<ActivityNode>;
  journalItemSelected: EventEmitter<JournalItemSelectedArgs>;
  onWorkflowInstanceModelChanged(oldValue: WorkflowJournalModel, newValue: WorkflowJournalModel): Promise<void>;
  componentWillLoad(): Promise<void>;
  refresh(): Promise<void>;
  render(): any;
  private renderBlocks;
  private loadJournalPage;
  private createBlocks;
  private findChildBlocks;
  private onBlockClick;
  private onJournalItemClick;
  private sortByTimestamp;
  private createActivityMapForJournal;
}
