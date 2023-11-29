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
let HttpRequestPortProvider = class HttpRequestPortProvider {
  getOutboundPorts(context) {
    var _a;
    const activity = context.activity;
    if (activity == null)
      return [];
    const defaultPort = { name: 'unmatchedStatusCode', displayName: 'Unmatched status code', type: PortType.Embedded }; // Hide the port from the designer until the editor uI is finished.
    const statusCodes = (_a = activity.expectedStatusCodes) !== null && _a !== void 0 ? _a : [];
    const ports = statusCodes.map(x => ({ name: x.statusCode.toString(), displayName: x.statusCode.toString(), type: PortType.Embedded }));
    return [...ports, defaultPort];
  }
  resolvePort(portName, context) {
    var _a;
    const activity = context.activity;
    if (portName == 'unmatchedStatusCode')
      return activity.unmatchedStatusCode;
    const expectedStatusCodes = (_a = activity.expectedStatusCodes) !== null && _a !== void 0 ? _a : [];
    const matchingStatusCode = expectedStatusCodes.find(x => x.statusCode.toString() == portName);
    return matchingStatusCode === null || matchingStatusCode === void 0 ? void 0 : matchingStatusCode.activity;
  }
  assignPort(portName, activity, context) {
    var _a;
    const sendHttpRequestActivity = context.activity;
    if (portName == 'unmatchedStatusCode') {
      sendHttpRequestActivity.unmatchedStatusCode = activity;
      return;
    }
    const statusCodes = (_a = sendHttpRequestActivity.expectedStatusCodes) !== null && _a !== void 0 ? _a : [];
    const matchingStatusCode = statusCodes.find(x => x.statusCode.toString() === portName);
    if (!matchingStatusCode)
      return;
    matchingStatusCode.activity = activity;
  }
};
HttpRequestPortProvider = __decorate([
  Service()
], HttpRequestPortProvider);
export { HttpRequestPortProvider };
//# sourceMappingURL=http-request-port-provider.js.map
