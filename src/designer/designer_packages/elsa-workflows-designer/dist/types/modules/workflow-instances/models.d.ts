import { TabDefinition, WorkflowExecutionLogRecord, WorkflowInstance } from "../../models";
import moment from "moment";
import { WorkflowDefinition } from "../workflow-definitions/models/entities";
export declare const WorkflowInstanceViewerEventTypes: {
  WorkflowDefinition: {
    Imported: string;
  };
  WorkflowInstanceViewer: {
    Ready: string;
  };
};
export declare const WorkflowInstancePropertiesEventTypes: {
  Displaying: string;
};
export interface WorkflowInstancePropertiesDisplayingArgs {
  model: WorkflowInstancePropertiesViewerModel;
}
export interface TabModel {
  name: string;
  tab: TabDefinition;
}
export interface Widget {
  name: string;
  content: () => any;
  order?: number;
}
export interface PropertiesTabModel extends TabModel {
  Widgets: Array<Widget>;
}
export interface WorkflowInstancePropertiesViewerModel {
  tabModels: Array<TabModel>;
}
export interface ActivityExecutionEventBlock {
  nodeId: string;
  activityId: string;
  activityInstanceId: string;
  parentActivityInstanceId: string;
  completed: boolean;
  suspended: boolean;
  faulted: boolean;
  timestamp: Date;
  duration?: moment.Duration;
  startedRecord: WorkflowExecutionLogRecord;
  completedRecord?: WorkflowExecutionLogRecord;
  faultedRecord?: WorkflowExecutionLogRecord;
  suspendedRecord?: WorkflowExecutionLogRecord;
  children: Array<ActivityExecutionEventBlock>;
}
export interface WorkflowJournalModel {
  workflowInstance: WorkflowInstance;
  workflowDefinition: WorkflowDefinition;
}
