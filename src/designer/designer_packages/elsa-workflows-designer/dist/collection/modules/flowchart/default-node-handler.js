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
import { PortProviderRegistry } from "../../services";
import { PortType } from "../../models";
import { v4 as uuid } from 'uuid';
let DefaultNodeHandler = class DefaultNodeHandler {
  constructor() {
    this.portProviderRegistry = Container.get(PortProviderRegistry);
  }
  createDesignerNode(context) {
    const { activityDescriptor, activity, x, y } = context;
    const portModels = this.createPorts(context);
    return {
      id: activity.id,
      shape: 'activity',
      activity: activity,
      activityDescriptor: activityDescriptor,
      x: x,
      y: y,
      data: activity,
      ports: portModels
    };
  }
  createPorts(context) {
    const { activityDescriptor, activity } = context;
    const provider = this.portProviderRegistry.get(activityDescriptor.typeName);
    const providerContext = { activityDescriptor, activity };
    const inPorts = [{ name: 'In', displayName: null, mode: PortType.Flow }];
    let outPorts = provider.getOutboundPorts(providerContext).filter(x => x.type == PortType.Flow);
    // In a flowchart, always add a Done port to connect the next node.
    if (outPorts.length == 0)
      outPorts = [{ name: 'Done', displayName: 'Done', type: PortType.Flow }];
    if (outPorts.length == 1)
      outPorts[0].displayName = null;
    const leftPortModels = inPorts.map((x) => ({
      id: uuid() + '_' + x.name,
      group: 'left',
      attrs: !!x.displayName ? {
        text: {
          text: x.displayName
        },
      } : null,
      type: 'in',
      position: 'left'
    }));
    const rightPortModels = outPorts.map((x) => ({
      id: uuid() + '_' + x.name,
      group: 'right',
      attrs: {
        text: {
          text: x.displayName
        },
      },
      type: 'out',
      position: 'right'
    }));
    const portModels = [...leftPortModels, ...rightPortModels];
    return portModels;
  }
};
DefaultNodeHandler = __decorate([
  Service(),
  __metadata("design:paramtypes", [])
], DefaultNodeHandler);
export { DefaultNodeHandler };
//# sourceMappingURL=default-node-handler.js.map
