var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import 'reflect-metadata';
import { camelCase } from 'lodash';
import { Service } from "typedi";
let FlowchartPortProvider = class FlowchartPortProvider {
  getOutboundPorts(context) {
    const { activityDescriptor } = context;
    return [...activityDescriptor.ports];
  }
  resolvePort(portName, context) {
    const propName = camelCase(portName);
    const activity = context.activity;
    if (!activity)
      return null;
    const flowchartActivity = context.activity;
    if (propName == 'start') {
      const startActivityId = flowchartActivity.start;
      return flowchartActivity.activities.find(x => x.id == startActivityId);
    }
    return activity[propName];
  }
  assignPort(portName, activity, context) {
    const propName = camelCase(portName);
    const container = context.activity;
    if (!container)
      return null;
    container[propName] = activity;
  }
};
FlowchartPortProvider = __decorate([
  Service()
], FlowchartPortProvider);
export { FlowchartPortProvider };
//# sourceMappingURL=flowchart-port-provider.js.map
