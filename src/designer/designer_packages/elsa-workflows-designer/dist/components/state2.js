import { h } from '@stencil/core/internal/client';
import { c as createProviderConsumer } from './state-tunnel2.js';

const InputControlSwitchContextState = createProviderConsumer({
  workflowDefinitionId: null,
  activityType: null,
  propertyName: null
}, (subscribe, child) => (h("context-consumer", { subscribe: subscribe, renderer: child })));

export { InputControlSwitchContextState as I };

//# sourceMappingURL=state2.js.map