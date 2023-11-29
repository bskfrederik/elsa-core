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
import { Container, Service } from "typedi";
import { EventBus } from "../../../services";
import { ActivityPropertyPanelEvents } from "../models/ui";
import { WorkflowDefinitionsApi } from "../services/api";
let CompositeActivityVersionPlugin = class CompositeActivityVersionPlugin {
  constructor() {
    this.onPropertyPanelRendering = (context) => {
      if (context.activityDescriptor.customProperties['RootType'] != 'WorkflowDefinitionActivity')
        return;
      const versionTab = {
        order: 20,
        displayText: 'Version',
        content: () => h("elsa-workflow-definition-activity-version-settings", { renderContext: context })
      };
      context.tabs.push(versionTab);
    };
    this.eventBus = Container.get(EventBus);
    this.workflowDefinitionsApi = Container.get(WorkflowDefinitionsApi);
    this.eventBus.on(ActivityPropertyPanelEvents.Displaying, this.onPropertyPanelRendering);
  }
  async initialize() {
  }
};
CompositeActivityVersionPlugin = __decorate([
  Service(),
  __metadata("design:paramtypes", [])
], CompositeActivityVersionPlugin);
export { CompositeActivityVersionPlugin };
//# sourceMappingURL=composite-version-plugin.js.map
