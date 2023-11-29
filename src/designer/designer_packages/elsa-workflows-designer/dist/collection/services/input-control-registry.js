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
import { h } from '@stencil/core';
import { Service } from "typedi";
// A registry of input controls mapped against UI hints.
let InputControlRegistry = class InputControlRegistry {
  constructor() {
    this.inputMap = new Map();
    this.add('single-line', c => h("elsa-single-line-input", { inputContext: c }));
    this.add('multi-line', c => h("elsa-multi-line-input", { inputContext: c }));
    this.add('dropdown', c => h("elsa-dropdown-input", { inputContext: c }));
    this.add('check-list', c => h("elsa-check-list-input", { inputContext: c }));
    this.add('radio-list', c => h("elsa-radio-list-input", { inputContext: c }));
    this.add('multi-text', c => h("elsa-multi-text-input", { inputContext: c }));
    this.add('code-editor', c => h("elsa-code-editor-input", { inputContext: c }));
    this.add('checkbox', c => h("elsa-checkbox-input", { inputContext: c }));
    this.add('variable-picker', c => h("elsa-variable-picker-input", { inputContext: c }));
    this.add('type-picker', c => h("elsa-type-picker-input", { inputContext: c }));
    this.add('output-picker', c => h("elsa-output-picker-input", { inputContext: c }));
    this.add('outcome-picker', c => h("elsa-outcome-picker-input", { inputContext: c }));
  }
  add(uiHint, control) {
    this.inputMap.set(uiHint, control);
  }
  get(uiHint) {
    return this.inputMap.get(uiHint);
  }
  has(uiHint) {
    return this.inputMap.has(uiHint);
  }
};
InputControlRegistry = __decorate([
  Service(),
  __metadata("design:paramtypes", [])
], InputControlRegistry);
export { InputControlRegistry };
//# sourceMappingURL=input-control-registry.js.map
