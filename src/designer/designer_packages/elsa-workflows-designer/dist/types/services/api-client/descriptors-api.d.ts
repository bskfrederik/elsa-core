import { ActivityDescriptorsApi } from "./activity-descriptors-api";
import { AxiosInstance } from "axios";
import { StorageDriversApi } from "./storage-drivers-api";
import { VariableDescriptorsApi } from "./variable-descriptors-api";
import { WorkflowActivationStrategiesApi } from "./workflow-activation-strategies-api";
import { FeaturesApi } from "./features-api";
export declare class DescriptorsApi {
  httpClient: AxiosInstance;
  activities: ActivityDescriptorsApi;
  storageDrivers: StorageDriversApi;
  variables: VariableDescriptorsApi;
  workflowActivationStrategies: WorkflowActivationStrategiesApi;
  features: FeaturesApi;
  constructor(httpClient: AxiosInstance);
}
