import { h } from "@stencil/core";
import { createProviderConsumer } from "@stencil/state-tunnel";
export default createProviderConsumer({
  workflowDefinition: null,
}, (subscribe, child) => (h("context-consumer", { subscribe: subscribe, renderer: child })));
//# sourceMappingURL=state.js.map
