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
import _ from 'lodash';
import { Service } from 'typedi';
import { DefaultInputDriver } from "../drivers/input/default-input-driver";
let InputDriverRegistry = class InputDriverRegistry {
  constructor() {
    this.drivers = [new DefaultInputDriver()];
  }
  add(driver) {
    const drivers = [...this.drivers, driver];
    this.drivers = _.orderBy(drivers, x => x.priority, 'desc');
  }
  get(context) {
    return this.drivers.find(x => x.supportsInput(context));
  }
};
InputDriverRegistry = __decorate([
  Service()
], InputDriverRegistry);
export { InputDriverRegistry };
//# sourceMappingURL=input-driver-registry.js.map
