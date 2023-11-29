import { ActivityDescriptorsApi } from "./activity-descriptors-api";
import { StorageDriversApi } from "./storage-drivers-api";
import { VariableDescriptorsApi } from "./variable-descriptors-api";
import { WorkflowActivationStrategiesApi } from "./workflow-activation-strategies-api";
import { FeaturesApi } from "./features-api";
export class DescriptorsApi {
  constructor(httpClient) {
    this.httpClient = httpClient;
    this.activities = new ActivityDescriptorsApi(httpClient);
    this.storageDrivers = new StorageDriversApi(httpClient);
    this.variables = new VariableDescriptorsApi(httpClient);
    this.workflowActivationStrategies = new WorkflowActivationStrategiesApi(httpClient);
    this.features = new FeaturesApi(httpClient);
  }
}
//# sourceMappingURL=descriptors-api.js.map
