import { PagedList, WorkflowInstanceSummary, WorkflowStatus, WorkflowSubStatus } from "../../../models";
export declare function getStatusColor(status: WorkflowStatus): any;
export declare function getSubStatusColor(status: WorkflowSubStatus): any;
export declare function updateSelectedWorkflowInstances(isChecked: boolean, workflowInstances: PagedList<WorkflowInstanceSummary>, selectedWorkflowInstanceIds: Array<string>): string[];
