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
import { Service } from "typedi";
import { PortType } from "../../../models";
let FlowSwitchPortProvider = class FlowSwitchPortProvider {
  getOutboundPorts(context) {
    var _a;
    const activity = context.activity;
    if (activity == null)
      return [];
    const cases = (_a = activity.cases) !== null && _a !== void 0 ? _a : [];
    return cases.map(x => ({ name: x.label, displayName: x.label, type: PortType.Flow }));
  }
  resolvePort(portName, context) {
    return null;
  }
  assignPort(portName, activity, context) {
    return null;
  }
};
FlowSwitchPortProvider = __decorate([
  Service()
], FlowSwitchPortProvider);
export { FlowSwitchPortProvider };
//# sourceMappingURL=flow-switch-port-provider.js.map
