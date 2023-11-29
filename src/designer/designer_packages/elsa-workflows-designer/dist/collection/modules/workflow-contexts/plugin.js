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
import { Container, Service } from "typedi";
import { EventTypes } from "../../models";
import { AuthContext, EventBus, InputControlRegistry } from "../../services";
import { h } from "@stencil/core";
import { WorkflowPropertiesEditorEventTypes } from "../workflow-definitions/models/ui";
import { WorkflowContextsApi } from "./services/api";
import descriptorsStore from "../../data/descriptors-store";
let WorkflowContextsPlugin = class WorkflowContextsPlugin {
  constructor() {
    this.providerDescriptors = [];
    this.onSignedIn = async () => {
      // Need to do this post-sign in, this is a secure API call.
      const installedFeatures = descriptorsStore.installedFeatures;
      if (!installedFeatures.find(x => x.name == 'WorkflowContexts'))
        return;
      this.providerDescriptors = await this.apiClient.list();
      this.setupCustomInputControls();
      this.setupCustomPropertyEditors();
    };
    this.onPropertyPanelRendering = (context) => {
      const tabs = context.model.tabModels;
      const workflowDefinition = context.workflowDefinition;
      const notifyWorkflowDefinitionChanged = context.notifyWorkflowDefinitionChanged;
      const descriptors = this.providerDescriptors;
      const contextProvidersWidget = {
        order: 20,
        name: 'workflow-context-providers',
        content: () => h("elsa-workflow-context-provider-check-list", { descriptors: descriptors, workflowDefinition: workflowDefinition, onWorkflowDefinitionChanged: notifyWorkflowDefinitionChanged })
      };
      const workflowContextProvidersTab = {
        name: 'workflow-context-providers',
        tab: {
          order: 20,
          displayText: 'Context',
          content: () => h("elsa-widgets", { widgets: [contextProvidersWidget] })
        }
      };
      tabs.push(workflowContextProvidersTab);
    };
    this.apiClient = Container.get(WorkflowContextsApi);
    this.setupSignIn();
  }
  async initialize() {
    const authContext = Container.get(AuthContext);
    if (authContext.getIsSignedIn()) {
      await this.onSignedIn();
    }
  }
  setupCustomInputControls() {
    const inputControlRegistry = Container.get(InputControlRegistry);
    const descriptors = this.providerDescriptors;
    inputControlRegistry.add('workflow-context-provider-picker', c => h("elsa-workflow-context-provider-type-picker-input", { inputContext: c, descriptors: descriptors }));
  }
  setupSignIn() {
    const eventBus = Container.get(EventBus);
    eventBus.on(EventTypes.Descriptors.Updated, this.onSignedIn);
  }
  setupCustomPropertyEditors() {
    const eventBus = Container.get(EventBus);
    eventBus.detach(WorkflowPropertiesEditorEventTypes.Displaying, this.onPropertyPanelRendering);
    eventBus.on(WorkflowPropertiesEditorEventTypes.Displaying, this.onPropertyPanelRendering);
  }
};
WorkflowContextsPlugin = __decorate([
  Service(),
  __metadata("design:paramtypes", [])
], WorkflowContextsPlugin);
export { WorkflowContextsPlugin };
//# sourceMappingURL=plugin.js.map
