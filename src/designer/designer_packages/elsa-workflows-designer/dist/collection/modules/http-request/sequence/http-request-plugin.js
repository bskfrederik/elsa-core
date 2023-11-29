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
var HttpRequestPlugin_1;
import 'reflect-metadata';
import { h } from '@stencil/core';
import { Container, Service } from "typedi";
import { ActivityIconRegistry, InputControlRegistry, PortProviderRegistry } from "../../../services";
import { HttpRequestPortProvider } from "./http-request-port-provider";
import { HttpRequestIcon } from "../icons";
let HttpRequestPlugin = HttpRequestPlugin_1 = class HttpRequestPlugin {
  constructor() {
    const activityTypeName = HttpRequestPlugin_1.ActivityTypeName;
    const portProviderRegistry = Container.get(PortProviderRegistry);
    const iconRegistry = Container.get(ActivityIconRegistry);
    const inputControlRegistry = Container.get(InputControlRegistry);
    portProviderRegistry.add(activityTypeName, () => Container.get(HttpRequestPortProvider));
    iconRegistry.add(HttpRequestPlugin_1.ActivityTypeName, settings => h(HttpRequestIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
    inputControlRegistry.add('http-status-codes', c => h("elsa-http-status-codes-editor", { inputContext: c }));
  }
  async initialize() {
  }
};
HttpRequestPlugin.ActivityTypeName = 'Elsa.SendHttpRequest';
HttpRequestPlugin = HttpRequestPlugin_1 = __decorate([
  Service(),
  __metadata("design:paramtypes", [])
], HttpRequestPlugin);
export { HttpRequestPlugin };
//# sourceMappingURL=http-request-plugin.js.map
