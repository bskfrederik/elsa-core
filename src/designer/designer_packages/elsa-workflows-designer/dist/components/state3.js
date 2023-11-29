import { c as createProviderConsumer } from './state-tunnel2.js';
import { h } from '@stencil/core/internal/client';

const FlowchartTunnel = createProviderConsumer({
  nodeMap: {}
}, (subscribe, child) => (h("context-consumer", { subscribe: subscribe, renderer: child })));

export { FlowchartTunnel as F };

//# sourceMappingURL=state3.js.map