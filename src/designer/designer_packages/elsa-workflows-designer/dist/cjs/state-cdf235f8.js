'use strict';

const stateTunnel = require('./state-tunnel-df062325.js');
const index = require('./index-2c400919.js');

const FlowchartTunnel = stateTunnel.createProviderConsumer({
  nodeMap: {}
}, (subscribe, child) => (index.h("context-consumer", { subscribe: subscribe, renderer: child })));

exports.FlowchartTunnel = FlowchartTunnel;

//# sourceMappingURL=state-cdf235f8.js.map