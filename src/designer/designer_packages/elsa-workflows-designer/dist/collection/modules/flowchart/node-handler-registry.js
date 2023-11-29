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
import { DefaultNodeHandler } from "./default-node-handler";
let NodeHandlerRegistry = class NodeHandlerRegistry {
  constructor() {
    this.handlerMap = new Map();
    this.defaultHandlerFactory = () => Container.get(DefaultNodeHandler);
  }
  add(activityType, handlerFactory) {
    this.handlerMap.set(activityType, handlerFactory);
  }
  get(activityType) {
    return this.handlerMap.get(activityType);
  }
  createHandler(activityType) {
    var _a;
    const factory = (_a = this.get(activityType)) !== null && _a !== void 0 ? _a : this.defaultHandlerFactory;
    return factory();
  }
};
NodeHandlerRegistry = __decorate([
  Service()
], NodeHandlerRegistry);
export { NodeHandlerRegistry };
//# sourceMappingURL=node-handler-registry.js.map
