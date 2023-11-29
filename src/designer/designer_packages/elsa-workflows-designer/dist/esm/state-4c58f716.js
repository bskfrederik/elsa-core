import { h } from './index-08112852.js';
import { c as createProviderConsumer } from './state-tunnel-464fcd1b.js';

const WorkflowDefinitionTunnel = createProviderConsumer({
  workflowDefinition: null,
}, (subscribe, child) => (h("context-consumer", { subscribe: subscribe, renderer: child })));

export { WorkflowDefinitionTunnel as W };

//# sourceMappingURL=state-4c58f716.js.map