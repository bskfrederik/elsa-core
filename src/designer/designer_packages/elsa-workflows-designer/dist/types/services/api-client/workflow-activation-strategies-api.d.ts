import { WorkflowActivationStrategyDescriptor } from "../../models";
import { AxiosInstance } from "axios";
export declare class WorkflowActivationStrategiesApi {
  private httpClient;
  constructor(httpClient: AxiosInstance);
  list(): Promise<Array<WorkflowActivationStrategyDescriptor>>;
}
