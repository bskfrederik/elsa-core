import { ActivityDescriptor } from "../../models";
import { AxiosInstance } from "axios";
export interface ActivityDescriptorResponse {
  items: Array<ActivityDescriptor>;
}
export declare class ActivityDescriptorsApi {
  private httpClient;
  constructor(httpClient: AxiosInstance);
  list(): Promise<Array<ActivityDescriptor>>;
}
