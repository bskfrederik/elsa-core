import { AxiosInstance } from "axios";
export declare class JavaScriptApi {
  private httpClient;
  constructor(httpClient: AxiosInstance);
  getTypeDefinitions(request: GetTypeDefinitionsRequest): Promise<string>;
}
export interface GetTypeDefinitionsRequest {
  workflowDefinitionId: string;
  activityTypeName?: string;
  propertyName?: string;
}
