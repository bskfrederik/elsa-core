'use strict';

const index = require('./index-2c400919.js');
const stateTunnel = require('./state-tunnel-df062325.js');

const WorkflowDefinitionTunnel = stateTunnel.createProviderConsumer({
  workflowDefinition: null,
}, (subscribe, child) => (index.h("context-consumer", { subscribe: subscribe, renderer: child })));

exports.WorkflowDefinitionTunnel = WorkflowDefinitionTunnel;

//# sourceMappingURL=state-b887cd17.js.map