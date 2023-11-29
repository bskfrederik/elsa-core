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
import { Service } from "typedi";
import state from "./state";
let ModalDialogService = class ModalDialogService {
  show(content, options) {
    const newInstance = {
      content: content,
      options: options
    };
    let instances = state.instances;
    instances = [...instances, newInstance];
    state.instances = instances;
    return newInstance;
  }
  hide(instance) {
    let instances = state.instances;
    instances = instances.filter(x => x != instance);
    state.instances = instances;
  }
};
ModalDialogService = __decorate([
  Service()
], ModalDialogService);
export { ModalDialogService };
//# sourceMappingURL=services.js.map
