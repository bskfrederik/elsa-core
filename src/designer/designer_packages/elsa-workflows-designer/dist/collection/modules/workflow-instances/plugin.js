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
import { EventBus } from "../../services";
import { WorkflowDefinitionsApi } from "../workflow-definitions/services/api";
import { DefaultModalActions, ModalDialogService } from "../../components/shared/modal-dialog";
import toolbarButtonMenuItemStore from "../../data/toolbar-button-menu-item-store";
import { WorkflowInstancesApi } from "./services/workflow-instances-api";
import { h } from "@stencil/core";
import NotificationService from "../notifications/notification-service";
import { uuid } from "@antv/x6/es/util/string/uuid";
import { NotificationDisplayType } from "../notifications/models";
import { WorkflowInstanceViewerService } from "./services/viewer-service";
let WorkflowInstancesPlugin = class WorkflowInstancesPlugin {
  constructor() {
    this.showWorkflowInstanceViewer = (workflowDefinition, workflowInstance) => {
      const service = Container.get(WorkflowInstanceViewerService);
      service.show(workflowDefinition, workflowInstance);
    };
    this.onBrowseWorkflowInstances = async () => {
      const closeAction = DefaultModalActions.Close();
      const actions = [closeAction];
      this.workflowInstanceBrowserInstance = this.modalDialogService.show(() => h("elsa-workflow-instance-browser", { onWorkflowInstanceSelected: this.onWorkflowInstanceSelected }), { actions: actions, size: 'tw-max-w-screen-2xl' });
    };
    this.onWorkflowInstanceSelected = async (e) => {
      const definitionId = e.detail.definitionId;
      const instanceId = e.detail.id;
      const version = e.detail.version;
      await this.workflowDefinitionsApi.get({ definitionId, versionOptions: { version }, includeCompositeRoot: true })
        .then(async (workflowDefinition) => {
        await this.workflowInstancesApi.get({ id: instanceId }).then((workflowInstance) => {
          this.showWorkflowInstanceViewer(workflowDefinition, workflowInstance);
          this.modalDialogService.hide(this.workflowInstanceBrowserInstance);
        }).catch(() => {
          NotificationService.createNotification({
            title: 'Error',
            id: uuid(),
            text: h("div", null, "Could not load workflow instance ", instanceId, " information"),
            type: NotificationDisplayType.Error
          });
          this.modalDialogService.hide(this.workflowInstanceBrowserInstance);
        });
      }).catch(() => {
        NotificationService.createNotification({
          title: 'Error',
          id: uuid(),
          text: h("div", null, "Could not load workflow ", definitionId, " information"),
          type: NotificationDisplayType.Error
        });
        this.modalDialogService.hide(this.workflowInstanceBrowserInstance);
      });
    };
    this.eventBus = Container.get(EventBus);
    this.workflowDefinitionsApi = Container.get(WorkflowDefinitionsApi);
    this.workflowInstancesApi = Container.get(WorkflowInstancesApi);
    this.modalDialogService = Container.get(ModalDialogService);
    const workflowInstanceBrowserItem = {
      text: 'Workflow Instances',
      onClick: this.onBrowseWorkflowInstances,
      order: 5
    };
    toolbarButtonMenuItemStore.items = [...toolbarButtonMenuItemStore.items, workflowInstanceBrowserItem];
  }
  async initialize() {
  }
};
WorkflowInstancesPlugin = __decorate([
  Service(),
  __metadata("design:paramtypes", [])
], WorkflowInstancesPlugin);
export { WorkflowInstancesPlugin };
//# sourceMappingURL=plugin.js.map
