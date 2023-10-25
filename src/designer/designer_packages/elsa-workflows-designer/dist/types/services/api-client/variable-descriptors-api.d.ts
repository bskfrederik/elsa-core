import { AxiosInstance } from "axios";
export interface VariableDescriptorsResponse {
  items: Array<VariableDescriptor>;
}
export interface VariableDescriptor {
  typeName: string;
  displayName: string;
  category: string;
  description?: string;
}
export declare class VariableDescriptorsApi {
  private httpClient;
  constructor(httpClient: AxiosInstance);
  list(): Promise<Array<VariableDescriptor>>;
}
