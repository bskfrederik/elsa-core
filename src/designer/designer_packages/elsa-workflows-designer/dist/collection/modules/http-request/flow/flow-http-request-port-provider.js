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
let FlowHttpRequestPortProvider = class FlowHttpRequestPortProvider {
  getOutboundPorts(context) {
    const activity = context.activity;
    if (activity == null)
      return [];
    const expectedStatusCodes = activity.expectedStatusCodes;
    if (!expectedStatusCodes)
      return [];
    const statusCodesJson = expectedStatusCodes.expression.value;
    const statusCodes = JSON.parse(statusCodesJson);
    const catchAllPort = { name: 'Unmatched status code', displayName: 'Unmatched status code', type: PortType.Flow };
    const outcomes = [...statusCodes.map(x => ({ name: x.toString(), displayName: x.toString(), type: PortType.Flow })), catchAllPort];
    return outcomes;
  }
  resolvePort(portName, context) {
    return null;
  }
  assignPort(portName, activity, context) {
    return null;
  }
};
FlowHttpRequestPortProvider = __decorate([
  Service()
], FlowHttpRequestPortProvider);
export { FlowHttpRequestPortProvider };
//# sourceMappingURL=flow-http-request-port-provider.js.map
