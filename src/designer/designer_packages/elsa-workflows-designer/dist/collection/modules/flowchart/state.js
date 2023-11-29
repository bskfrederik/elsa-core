import { createProviderConsumer } from "@stencil/state-tunnel";
import { h } from "@stencil/core";
export default createProviderConsumer({
  nodeMap: {}
}, (subscribe, child) => (h("context-consumer", { subscribe: subscribe, renderer: child })));
//# sourceMappingURL=state.js.map
