import { OrderBy, OrderDirection, PagedList, VersionOptions, WorkflowExecutionLogRecord, WorkflowInstance, WorkflowInstanceSummary, WorkflowStatus, WorkflowSubStatus } from "../../../models";
import { ElsaClientProvider } from "../../../services";
export declare class WorkflowInstancesApi {
  private provider;
  constructor(provider: ElsaClientProvider);
  list(request: ListWorkflowInstancesRequest): Promise<PagedList<WorkflowInstanceSummary>>;
  get(request: GetWorkflowInstanceRequest): Promise<WorkflowInstance>;
  delete(request: DeleteWorkflowInstanceRequest): Promise<WorkflowInstanceSummary>;
  deleteMany(request: BulkDeleteWorkflowInstancesRequest): Promise<number>;
  cancelMany(request: BulkCancelWorkflowInstancesRequest): Promise<number>;
  getJournal(request: GetWorkflowJournalRequest): Promise<PagedList<WorkflowExecutionLogRecord>>;
  private getHttpClient;
}
export interface ListWorkflowInstancesRequest {
  searchTerm?: string;
  definitionId?: string;
  correlationId?: string;
  definitionIds?: Array<string>;
  versionOptions?: VersionOptions;
  status?: WorkflowStatus;
  subStatus?: WorkflowSubStatus;
  orderBy?: OrderBy;
  orderDirection?: OrderDirection;
  page?: number;
  pageSize?: number;
}
export interface GetWorkflowInstanceRequest {
  id: string;
}
export interface DeleteWorkflowInstanceRequest {
  id: string;
}
export interface BulkDeleteWorkflowInstancesRequest {
  workflowInstanceIds: Array<string>;
}
export interface BulkCancelWorkflowInstancesRequest {
  workflowInstanceIds: Array<string>;
}
export interface GetWorkflowJournalRequest {
  workflowInstanceId: string;
  page?: number;
  pageSize?: number;
}
