import { createStore } from '@stencil/store';
const { state, onChange } = createStore({
  activityDescriptors: [],
  storageDrivers: [],
  variableDescriptors: [],
  workflowActivationStrategyDescriptors: [],
  installedFeatures: []
});
export default state;
//# sourceMappingURL=descriptors-store.js.map
