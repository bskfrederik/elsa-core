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
import { h } from "@stencil/core";
import { Container, Service } from "typedi";
import newButtonItemStore from "../../../data/new-button-item-store";
import { generateUniqueActivityName } from '../../../utils/generate-activity-name';
import descriptorsStore from "../../../data/descriptors-store";
import toolbarButtonMenuItemStore from "../../../data/toolbar-button-menu-item-store";
import { ActivityDescriptorManager, EventBus, InputControlRegistry } from "../../../services";
import { WorkflowDefinitionManager } from "../services/manager";
import { WorkflowDefinitionsApi } from "../services/api";
import { DefaultModalActions, ModalDialogService } from "../../../components/shared/modal-dialog";
import { htmlToElement } from "../../../utils";
import NotificationService from "../../notifications/notification-service";
import { uuid } from "@antv/x6/es/util/string/uuid";
import { NotificationDisplayType } from "../../notifications/models";
import { WorkflowDefinitionEditorService } from "../services/editor-service";
import { WorkflowInstanceViewerService } from '../../workflow-instances/services/viewer-service';
import { WorkflowInstancesApi } from '../../workflow-instances/services/workflow-instances-api';
const FlowchartTypeName = 'Elsa.Flowchart';
let WorkflowDefinitionsPlugin = class WorkflowDefinitionsPlugin {
  constructor() {
    this.newWorkflow = async () => {
      const flowchartDescriptor = this.getFlowchartDescriptor();
      const newName = await this.generateUniqueActivityName(flowchartDescriptor);
      const flowchart = {
        type: flowchartDescriptor.typeName,
        version: 1,
        activities: [],
        connections: [],
        id: newName,
        metadata: {},
        customProperties: {},
        variables: []
      };
      const workflowDefinition = {
        root: flowchart,
        id: '',
        name: 'Workflow 1',
        definitionId: '',
        version: 1,
        isLatest: true,
        isPublished: false,
        isReadonly: false,
        materializerName: 'Json'
      };
      const newWorkflowDefinition = await this.workflowDefinitionManager.saveWorkflow(workflowDefinition, false);
      this.showWorkflowDefinitionEditor(newWorkflowDefinition);
    };
    this.getFlowchartDescriptor = () => this.getActivityDescriptor(FlowchartTypeName);
    this.getActivityDescriptor = (typeName) => descriptorsStore.activityDescriptors.find(x => x.typeName == typeName);
    this.generateUniqueActivityName = async (activityDescriptor) => await generateUniqueActivityName([], activityDescriptor);
    this.showWorkflowDefinitionEditor = (workflowDefinition) => {
      this.workflowDefinitionEditorInstance = this.workflowDefinitionEditorService.show(workflowDefinition);
    };
    this.import = async () => {
      const fileInput = htmlToElement('<input type="file" />');
      document.body.append(fileInput);
      fileInput.click();
      fileInput.addEventListener('change', async (e) => {
        const files = fileInput.files;
        if (files.length == 0) {
          fileInput.remove();
          return;
        }
        const file = files[0];
        const importedWorkflow = await this.workflowDefinitionManager.importWorkflow(null, file);
        fileInput.remove();
        this.showWorkflowDefinitionEditor(importedWorkflow);
      });
    };
    this.onNewWorkflowDefinitionSelected = async () => {
      await this.newWorkflow();
      this.modalDialogService.hide(this.workflowDefinitionBrowserInstance);
    };
    this.onImportWorkflowDefinitionClick = async () => {
      await this.import();
      this.modalDialogService.hide(this.workflowDefinitionBrowserInstance);
    };
    this.onBrowseWorkflowDefinitions = async () => {
      const closeAction = DefaultModalActions.Close();
      const newAction = DefaultModalActions.New(this.onNewWorkflowDefinitionSelected);
      const actions = [closeAction, newAction];
      this.workflowDefinitionBrowserInstance = this.modalDialogService.show(() => h("elsa-workflow-definition-browser", { onWorkflowDefinitionSelected: this.onWorkflowDefinitionSelected, onWorkflowInstancesSelected: this.onWorkflowInstancesSelected, onNewWorkflowDefinitionSelected: this.onNewWorkflowDefinitionSelected }), { actions });
    };
    this.onWorkflowDefinitionSelected = async (e) => {
      const definitionId = e.detail.definitionId;
      const workflowDefinition = await this.api.get({ definitionId });
      this.showWorkflowDefinitionEditor(workflowDefinition);
      this.modalDialogService.hide(this.workflowDefinitionBrowserInstance);
    };
    this.onWorkflowInstancesSelected = async (e) => {
      const definitionId = e.detail.definitionId;
      const version = e.detail.version;
      const workflow = await this.api.get({ definitionId, versionOptions: { version } });
      this.workflowInstanceBrowserInstance = this.modalDialogService.show(() => h("elsa-workflow-instance-browser", { workflowDefinition: workflow, onWorkflowInstanceSelected: this.onWorkflowInstanceSelected }), { actions: [DefaultModalActions.Close()], size: 'tw-max-w-screen-2xl' });
    };
    this.publishCurrentWorkflow = async (args) => {
      return this.onPublishClicked(new CustomEvent('PublishClickedArgs', { detail: args }));
    };
    this.onPublishClicked = async (e) => {
      const definition = await this.workflowDefinitionEditorElement.getWorkflowDefinition();
      if (!definition.isLatest) {
        console.debug('Workflow definition is not latest. Skipping publish.');
        return;
      }
      e.detail.begin();
      const notification = NotificationService.createNotification({
        title: 'Publishing',
        id: uuid(),
        text: 'Workflow is being published. Please wait.',
        type: NotificationDisplayType.InProgress
      });
      await this.workflowDefinitionEditorInstance.saveWorkflowDefinition(definition, true)
        .then(async () => {
        var _a;
        NotificationService.updateNotification(notification, { title: 'Workflow published', text: 'Published!' });
        e.detail.complete();
        if ((_a = definition.options) === null || _a === void 0 ? void 0 : _a.autoUpdateConsumingWorkflows)
          await this.updateCompositeActivityReferences(definition);
        // Reload activity descriptors.
        await this.activityDescriptorManager.refresh();
      }).catch(() => {
        NotificationService.updateNotification(notification, {
          title: 'Error while publishing',
          text: h("span", null, "Workflow ", definition.definitionId, " could not be published."),
          type: NotificationDisplayType.Error
        });
        e.detail.complete();
      });
    };
    this.updateCompositeActivityReferences = async (definition) => {
      await this.api.updateWorkflowReferences({ definitionId: definition.definitionId })
        .then(async (response) => {
        const message = 'The following consuming workflows have been successfully updated:\n\n' + response.affectedWorkflows.join('\n');
        if (response.affectedWorkflows.length > 0) {
          NotificationService.createNotification({
            title: 'Consuming Workflows',
            id: uuid(),
            text: message,
            type: NotificationDisplayType.Success
          });
        }
      }).catch(() => {
        NotificationService.createNotification({
          title: 'Error while updating consuming workflows',
          id: uuid(),
          text: 'Consuming workflows could not be updated',
          type: NotificationDisplayType.Error
        });
      });
    };
    this.onWorkflowInstanceSelected = async (e) => {
      const definitionId = e.detail.definitionId;
      const instanceId = e.detail.id;
      const version = e.detail.version;
      await this.api.get({ definitionId, versionOptions: { version }, includeCompositeRoot: true })
        .then(async (workflowDefinition) => {
        await this.workflowInstancesApi.get({ id: instanceId }).then((workflowInstance) => {
          this.showWorkflowInstanceViewer(workflowDefinition, workflowInstance);
          this.modalDialogService.hide(this.workflowInstanceBrowserInstance);
          this.modalDialogService.hide(this.workflowDefinitionBrowserInstance);
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
    this.showWorkflowInstanceViewer = (workflowDefinition, workflowInstance) => {
      const service = Container.get(WorkflowInstanceViewerService);
      service.show(workflowDefinition, workflowInstance);
    };
    this.eventBus = Container.get(EventBus);
    this.api = Container.get(WorkflowDefinitionsApi);
    this.workflowDefinitionManager = Container.get(WorkflowDefinitionManager);
    this.workflowDefinitionEditorService = Container.get(WorkflowDefinitionEditorService);
    this.modalDialogService = Container.get(ModalDialogService);
    this.activityDescriptorManager = Container.get(ActivityDescriptorManager);
    this.inputControlRegistry = Container.get(InputControlRegistry);
    this.workflowInstancesApi = Container.get(WorkflowInstancesApi);
    const newMenuItems = [{
        order: 0,
        group: 0,
        text: 'Workflow Definition',
        handler: this.onNewWorkflowDefinitionSelected
      }, {
        order: 0,
        group: 2,
        text: 'Import',
        handler: this.onImportWorkflowDefinitionClick
      }];
    const toolbarItems = [{
        text: 'Workflow Definitions',
        onClick: this.onBrowseWorkflowDefinitions,
        order: 5
      }];
    newButtonItemStore.items = [...newButtonItemStore.items, ...newMenuItems];
    toolbarButtonMenuItemStore.items = [...toolbarButtonMenuItemStore.items, ...toolbarItems];
  }
  async initialize() {
    this.inputControlRegistry.add("workflow-definition-picker", c => h("elsa-workflow-definition-picker-input", { inputContext: c }));
  }
};
WorkflowDefinitionsPlugin = __decorate([
  Service(),
  __metadata("design:paramtypes", [])
], WorkflowDefinitionsPlugin);
export { WorkflowDefinitionsPlugin };
//# sourceMappingURL=workflow-definitions-plugin.js.map
