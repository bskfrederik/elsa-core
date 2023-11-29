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
var __metadata = (this && this.__metadata) || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(k, v);
};
var FlowHttpRequestPlugin_1;
import 'reflect-metadata';
import { h } from '@stencil/core';
import { Container, Service } from "typedi";
import { ActivityIconRegistry, PortProviderRegistry } from "../../../services";
import { FlowHttpRequestPortProvider } from "./flow-http-request-port-provider";
import { HttpRequestIcon } from "../icons";
let FlowHttpRequestPlugin = FlowHttpRequestPlugin_1 = class FlowHttpRequestPlugin {
  constructor() {
    const activityTypeName = FlowHttpRequestPlugin_1.ActivityTypeName;
    const portProviderRegistry = Container.get(PortProviderRegistry);
    const iconRegistry = Container.get(ActivityIconRegistry);
    portProviderRegistry.add(activityTypeName, () => Container.get(FlowHttpRequestPortProvider));
    iconRegistry.add(FlowHttpRequestPlugin_1.ActivityTypeName, settings => h(HttpRequestIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
  }
  async initialize() {
  }
};
FlowHttpRequestPlugin.ActivityTypeName = 'Elsa.FlowSendHttpRequest';
FlowHttpRequestPlugin = FlowHttpRequestPlugin_1 = __decorate([
  Service(),
  __metadata("design:paramtypes", [])
], FlowHttpRequestPlugin);
export { FlowHttpRequestPlugin };
//# sourceMappingURL=flow-http-request-plugin.js.map
