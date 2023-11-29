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
import descriptorsStore from "../data/descriptors-store";
import { ElsaClientProvider } from "./api-client/elsa-client";
let ActivityDescriptorManager = class ActivityDescriptorManager {
  constructor() {
    this.activityDescriptorsUpdatedCallback = null;
    this.elsaClientProvider = Container.get(ElsaClientProvider);
  }
  onActivityDescriptorsUpdated(callback) {
    this.activityDescriptorsUpdatedCallback = callback;
  }
  async refresh() {
    const elsaClient = await this.elsaClientProvider.getElsaClient();
    descriptorsStore.activityDescriptors = await elsaClient.descriptors.activities.list();
    if (this.activityDescriptorsUpdatedCallback) {
      this.activityDescriptorsUpdatedCallback();
    }
  }
};
ActivityDescriptorManager = __decorate([
  Service(),
  __metadata("design:paramtypes", [])
], ActivityDescriptorManager);
export { ActivityDescriptorManager };
//# sourceMappingURL=activity-descriptor-manager.js.map
