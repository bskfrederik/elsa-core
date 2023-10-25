import { StorageDriverDescriptor } from "../../models";
import { AxiosInstance } from "axios";
export interface StorageDriversResponse {
  items: Array<StorageDriverDescriptor>;
}
export declare class StorageDriversApi {
  private httpClient;
  constructor(httpClient: AxiosInstance);
  list(): Promise<Array<StorageDriverDescriptor>>;
}
