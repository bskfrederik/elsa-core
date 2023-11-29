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
import { Service } from "typedi";
import { EventTypes } from "../../models";
import { AuthContext, ElsaClientProvider, EventBus } from "../../services";
import descriptorsStore from "../../data/descriptors-store";
let DescriptorsPlugin = class DescriptorsPlugin {
  constructor(eventBus, elsaClientProvider, authContext) {
    this.eventBus = eventBus;
    this.elsaClientProvider = elsaClientProvider;
    this.authContext = authContext;
    this.loadDescriptors = async () => {
      const elsaClient = await this.elsaClientProvider.getElsaClient();
      const activityDescriptors = await elsaClient.descriptors.activities.list();
      const storageDrivers = await elsaClient.descriptors.storageDrivers.list();
      const variableDescriptors = await elsaClient.descriptors.variables.list();
      const workflowInstantiationStrategyDescriptors = await elsaClient.descriptors.workflowActivationStrategies.list();
      const installedFeatures = await elsaClient.descriptors.features.getInstalledFeatures();
      descriptorsStore.activityDescriptors = activityDescriptors;
      descriptorsStore.storageDrivers = storageDrivers;
      descriptorsStore.variableDescriptors = variableDescriptors;
      descriptorsStore.workflowActivationStrategyDescriptors = workflowInstantiationStrategyDescriptors;
      descriptorsStore.installedFeatures = installedFeatures;
      await this.eventBus.emit(EventTypes.Descriptors.Updated, this);
    };
  }
  async initialize() {
    this.eventBus.on(EventTypes.Auth.SignedIn, async () => await this.loadDescriptors());
  }
};
DescriptorsPlugin = __decorate([
  Service(),
  __metadata("design:paramtypes", [EventBus, ElsaClientProvider, AuthContext])
], DescriptorsPlugin);
export { DescriptorsPlugin };
//# sourceMappingURL=plugin.js.map
