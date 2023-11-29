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
let SwitchPortProvider = class SwitchPortProvider {
  getOutboundPorts(context) {
    var _a;
    const activity = context.activity;
    if (activity == null)
      return [];
    const cases = (_a = activity.cases) !== null && _a !== void 0 ? _a : [];
    const ports = cases.map(x => ({ name: x.label, displayName: x.label, type: PortType.Embedded }));
    const defaultPort = { name: 'default', displayName: 'Default', type: PortType.Embedded };
    return [...ports, defaultPort];
  }
  resolvePort(portName, context) {
    var _a;
    const activity = context.activity;
    if (portName == 'default')
      return activity.default;
    const cases = (_a = activity.cases) !== null && _a !== void 0 ? _a : [];
    const caseItem = cases.find(x => x.label == portName);
    if (!caseItem)
      return null;
    return caseItem.activity;
  }
  assignPort(portName, activity, context) {
    var _a;
    const switchActivity = context.activity;
    if (portName == 'default') {
      switchActivity.default = activity;
      return;
    }
    const cases = (_a = switchActivity.cases) !== null && _a !== void 0 ? _a : [];
    const caseItem = cases.find(x => x.label == portName);
    if (!caseItem)
      return;
    caseItem.activity = activity;
  }
};
SwitchPortProvider = __decorate([
  Service()
], SwitchPortProvider);
export { SwitchPortProvider };
//# sourceMappingURL=switch-port-provider.js.map
