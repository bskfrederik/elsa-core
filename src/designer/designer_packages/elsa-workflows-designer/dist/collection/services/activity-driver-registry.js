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
import { DefaultActivityDriver } from "../drivers/activity/default-activity-driver";
let ActivityDriverRegistry = class ActivityDriverRegistry {
  constructor() {
    this.driverMap = new Map();
    this.defaultDriverFactory = () => Container.get(DefaultActivityDriver);
  }
  add(activityType, driverFactory) {
    this.driverMap.set(activityType, driverFactory);
  }
  get(activityType) {
    return this.driverMap.get(activityType);
  }
  createDriver(activityType) {
    var _a;
    const driverFactory = (_a = this.get(activityType)) !== null && _a !== void 0 ? _a : this.defaultDriverFactory;
    return driverFactory();
  }
};
ActivityDriverRegistry = __decorate([
  Service()
], ActivityDriverRegistry);
export { ActivityDriverRegistry };
//# sourceMappingURL=activity-driver-registry.js.map
