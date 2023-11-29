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
import 'reflect-metadata';
import { Container, Service } from "typedi";
import { NodeHandlerRegistry } from "./node-handler-registry";
let NodeFactory = class NodeFactory {
  constructor() {
    this.handlerRegistry = Container.get(NodeHandlerRegistry);
  }
  createNode(activityDescriptor, activity, x, y) {
    const handler = this.handlerRegistry.createHandler(activityDescriptor.typeName);
    return handler.createDesignerNode({ activityDescriptor, activity, x, y });
  }
  createPorts(activityDescriptor, activity) {
    const handler = this.handlerRegistry.createHandler(activityDescriptor.typeName);
    return handler.createPorts({ activityDescriptor, activity });
  }
};
NodeFactory = __decorate([
  Service(),
  __metadata("design:paramtypes", [])
], NodeFactory);
export { NodeFactory };
//# sourceMappingURL=node-factory.js.map
