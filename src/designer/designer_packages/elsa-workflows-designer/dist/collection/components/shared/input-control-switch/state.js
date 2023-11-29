import { h } from "@stencil/core";
import { createProviderConsumer } from "@stencil/state-tunnel";
export default createProviderConsumer({
  workflowDefinitionId: null,
  activityType: null,
  propertyName: null
}, (subscribe, child) => (h("context-consumer", { subscribe: subscribe, renderer: child })));
//# sourceMappingURL=state.js.map
