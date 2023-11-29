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
import { Container, Service } from "typedi";
import { DefaultPortProvider } from "./default-port-provider";
let PortProviderRegistry = class PortProviderRegistry {
  constructor() {
    this.map = new Map();
    this.defaultProviderFactory = () => Container.get(DefaultPortProvider);
  }
  add(activityType, defaultProviderFactory) {
    this.map.set(activityType, defaultProviderFactory);
  }
  get(activityType) {
    var _a;
    const factory = (_a = this.map.get(activityType)) !== null && _a !== void 0 ? _a : this.defaultProviderFactory;
    return factory();
  }
};
PortProviderRegistry = __decorate([
  Service()
], PortProviderRegistry);
export { PortProviderRegistry };
//# sourceMappingURL=port-provider-registry.js.map
