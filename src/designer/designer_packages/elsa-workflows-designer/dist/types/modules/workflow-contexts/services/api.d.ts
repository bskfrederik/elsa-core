import { ElsaClientProvider } from "../../../services";
export declare class WorkflowContextsApi {
  private provider;
  constructor(provider: ElsaClientProvider);
  list(): Promise<Array<WorkflowContextProviderDescriptor>>;
  private getHttpClient;
}
export interface ListWorkflowContextsResponse {
  descriptors: Array<WorkflowContextProviderDescriptor>;
}
export interface WorkflowContextProviderDescriptor {
  name: string;
  type: string;
}
