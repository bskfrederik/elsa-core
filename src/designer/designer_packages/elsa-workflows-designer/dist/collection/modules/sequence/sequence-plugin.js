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
var SequencePlugin_1;
import 'reflect-metadata';
import { h } from '@stencil/core';
import { Container, Service } from "typedi";
import { ActivityIconRegistry } from "../../services";
import { getActivityIconCssClass } from "../../components/icons/activities";
let SequencePlugin = SequencePlugin_1 = class SequencePlugin {
  constructor() {
    const iconRegistry = Container.get(ActivityIconRegistry);
    iconRegistry.add(SequencePlugin_1.ActivityTypeName, settings => h(SequenceIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
  }
  async initialize() {
  }
};
SequencePlugin.ActivityTypeName = 'Elsa.Sequence';
SequencePlugin = SequencePlugin_1 = __decorate([
  Service(),
  __metadata("design:paramtypes", [])
], SequencePlugin);
export { SequencePlugin };
const SequenceIcon = (settings) => (h("svg", { class: getActivityIconCssClass(settings), width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { stroke: "none", d: "M0 0h24v24H0z" }), h("path", { d: "M9 4.55a8 8 0 0 1 6 14.9m0 -4.45v5h5" }), h("path", { d: "M11 19.95a8 8 0 0 1 -5.3 -12.8", "stroke-dasharray": ".001 4.13" })));
//# sourceMappingURL=sequence-plugin.js.map
