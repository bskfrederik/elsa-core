import { c as createStore } from './index2.js';

const { state, onChange } = createStore({
  activityDescriptors: [],
  storageDrivers: [],
  variableDescriptors: [],
  workflowActivationStrategyDescriptors: [],
  installedFeatures: []
});

export { state as s };

//# sourceMappingURL=descriptors-store.js.map