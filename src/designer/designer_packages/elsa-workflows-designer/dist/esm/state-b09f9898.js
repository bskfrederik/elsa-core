import { c as createProviderConsumer } from './state-tunnel-464fcd1b.js';
import { h } from './index-08112852.js';

const FlowchartTunnel = createProviderConsumer({
  nodeMap: {}
}, (subscribe, child) => (h("context-consumer", { subscribe: subscribe, renderer: child })));

export { FlowchartTunnel as F };

//# sourceMappingURL=state-b09f9898.js.map