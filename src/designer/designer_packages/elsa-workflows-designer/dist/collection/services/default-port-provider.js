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
let DefaultPortProvider = class DefaultPortProvider {
  getOutboundPorts(context) {
    const { activityDescriptor } = context;
    return [...activityDescriptor.ports];
  }
  resolvePort(portName, context) {
    const propName = camelCase(portName);
    const activity = context.activity;
    if (!activity)
      return null;
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
DefaultPortProvider = __decorate([
  Service()
], DefaultPortProvider);
export { DefaultPortProvider };
//# sourceMappingURL=default-port-provider.js.map
