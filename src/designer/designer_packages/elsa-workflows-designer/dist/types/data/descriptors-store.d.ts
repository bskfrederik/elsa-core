import { ActivityDescriptor, WorkflowActivationStrategyDescriptor } from "../models";
import { VariableDescriptor } from "../services/api-client/variable-descriptors-api";
import { FeatureDescriptor } from "../services/api-client/features-api";
export interface DescriptorsStore {
  activityDescriptors: Array<ActivityDescriptor>;
  storageDrivers: Array<any>;
  variableDescriptors: Array<VariableDescriptor>;
  workflowActivationStrategyDescriptors: Array<WorkflowActivationStrategyDescriptor>;
  installedFeatures: Array<FeatureDescriptor>;
}
declare const state: DescriptorsStore;
export default state;
