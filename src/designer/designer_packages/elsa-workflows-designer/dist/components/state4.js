import { h } from '@stencil/core/internal/client';
import { c as createProviderConsumer } from './state-tunnel2.js';

const WorkflowDefinitionTunnel = createProviderConsumer({
  workflowDefinition: null,
}, (subscribe, child) => (h("context-consumer", { subscribe: subscribe, renderer: child })));

export { WorkflowDefinitionTunnel as W };

//# sourceMappingURL=state4.js.map