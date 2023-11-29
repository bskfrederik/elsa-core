'use strict';

const index = require('./index-2c400919.js');
const stateTunnel = require('./state-tunnel-df062325.js');

const InputControlSwitchContextState = stateTunnel.createProviderConsumer({
  workflowDefinitionId: null,
  activityType: null,
  propertyName: null
}, (subscribe, child) => (index.h("context-consumer", { subscribe: subscribe, renderer: child })));

exports.InputControlSwitchContextState = InputControlSwitchContextState;

//# sourceMappingURL=state-729e23b0.js.map