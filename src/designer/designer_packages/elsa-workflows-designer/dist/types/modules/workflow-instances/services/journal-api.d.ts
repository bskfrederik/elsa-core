import { PagedList, WorkflowExecutionLogRecord } from "../../../models";
import { ElsaClientProvider } from "../../../services";
export declare class JournalApi {
  private provider;
  constructor(provider: ElsaClientProvider);
  list(request: GetWorkflowJournalRequest): Promise<PagedList<WorkflowExecutionLogRecord>>;
  getLastEntry(request: GetLastEntryRequest): Promise<WorkflowExecutionLogRecord>;
  private getHttpClient;
}
export interface GetWorkflowJournalRequest {
  workflowInstanceId: string;
  page?: number;
  pageSize?: number;
}
export interface GetLastEntryRequest {
  workflowInstanceId: string;
  activityId: string;
}
