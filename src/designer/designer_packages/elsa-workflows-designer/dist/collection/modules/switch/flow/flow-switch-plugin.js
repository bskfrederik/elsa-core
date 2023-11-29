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
var FlowSwitchPlugin_1;
import 'reflect-metadata';
import { h } from '@stencil/core';
import { Container, Service } from "typedi";
import { ActivityIconRegistry, InputControlRegistry, PortProviderRegistry } from "../../../services";
import { FlowSwitchPortProvider } from "./flow-switch-port-provider";
import { getActivityIconCssClass } from "../../../components/icons/activities";
let FlowSwitchPlugin = FlowSwitchPlugin_1 = class FlowSwitchPlugin {
  constructor() {
    const activityTypeName = FlowSwitchPlugin_1.ActivityTypeName;
    const inputControlRegistry = Container.get(InputControlRegistry);
    const portProviderRegistry = Container.get(PortProviderRegistry);
    const iconRegistry = Container.get(ActivityIconRegistry);
    inputControlRegistry.add('flow-switch-editor', c => h("elsa-flow-switch-editor", { inputContext: c }));
    portProviderRegistry.add(activityTypeName, () => Container.get(FlowSwitchPortProvider));
    iconRegistry.add(FlowSwitchPlugin_1.ActivityTypeName, settings => h(FlowSwitchIcon, { size: settings === null || settings === void 0 ? void 0 : settings.size }));
  }
  async initialize() {
  }
};
FlowSwitchPlugin.ActivityTypeName = 'Elsa.FlowSwitch';
FlowSwitchPlugin = FlowSwitchPlugin_1 = __decorate([
  Service(),
  __metadata("design:paramtypes", [])
], FlowSwitchPlugin);
export { FlowSwitchPlugin };
const FlowSwitchIcon = (settings) => (h("svg", { class: getActivityIconCssClass(settings), width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { stroke: "none", d: "M0 0h24v24H0z" }), h("polyline", { points: "15 4 19 4 19 8" }), h("line", { x1: "14.75", y1: "9.25", x2: "19", y2: "4" }), h("line", { x1: "5", y1: "19", x2: "9", y2: "15" }), h("polyline", { points: "15 19 19 19 19 15" }), h("line", { x1: "5", y1: "5", x2: "19", y2: "19" })));
//# sourceMappingURL=flow-switch-plugin.js.map
