import studioComponentStore from "../../../data/studio-component-store";
import { h } from "@stencil/core";
import NotificationService from "../../notifications/notification-service";
import { uuid } from "@antv/x6/es/util/string/uuid";
import { NotificationDisplayType } from "../../notifications/models";
import { Container } from "typedi";
import { WorkflowDefinitionManager } from "./manager";
import { WorkflowDefinitionsApi } from "./api";
import { ActivityDescriptorManager } from "../../../services";
import toolbarComponentStore from "../../../data/toolbar-component-store";
import { htmlToElement } from "../../../utils";
import { WorkflowDefinitionEditorService } from "./editor-service";
export class WorkflowDefinitionEditorInstance {
  constructor(workflowDefinition) {
    this.workflowDefinition = workflowDefinition;
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
        this.workflowDefinitionEditorService.show(importedWorkflow);
      });
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
      await this.saveWorkflowDefinition(definition, true)
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
    this.onUnPublishClicked = async (e) => {
      const definition = await this.workflowDefinitionEditorElement.getWorkflowDefinition();
      const notification = NotificationService.createNotification({
        title: 'Unpublishing',
        id: uuid(),
        text: 'Unpublishing the workflow. Please wait.',
        type: NotificationDisplayType.InProgress
      });
      await this.workflowDefinitionManager.retractWorkflow(definition)
        .then(async () => {
        NotificationService.updateNotification(notification, { title: 'Workflow unpublished', text: 'Unpublished!' });
        await this.activityDescriptorManager.refresh();
      }).catch(() => {
        NotificationService.updateNotification(notification, {
          title: 'Error while unpublishing',
          text: h("span", null, "Workflow ", definition.definitionId, " could not be unpublished."),
          type: NotificationDisplayType.Error
        });
      });
    };
    this.onExportClicked = async (e) => {
      const workflowDefinition = await this.workflowDefinitionEditorElement.getWorkflowDefinition();
      await this.workflowDefinitionManager.exportWorkflow(workflowDefinition);
    };
    this.onImportClicked = async (e) => {
      await this.import();
    };
    this.onWorkflowUpdated = async (e) => {
      const updatedWorkflowDefinition = e.detail.workflowDefinition;
      await this.saveWorkflowDefinition(updatedWorkflowDefinition, false)
        .catch(() => {
        NotificationService.createNotification({
          title: 'Error while saving',
          id: uuid(),
          text: h("span", null, "Workflow ", e.detail.workflowDefinition.definitionId, " could not be saved. "),
          type: NotificationDisplayType.Error
        });
      });
    };
    this.saveWorkflowDefinition = async (definition, publish) => {
      if (!definition.isLatest) {
        console.debug('Workflow definition is not latest. Skipping save.');
        return;
      }
      const workflowDefinitionManager = Container.get(WorkflowDefinitionManager);
      const updatedWorkflow = await workflowDefinitionManager.saveWorkflow(definition, publish);
      let reload = false;
      if (definition.id != updatedWorkflow.id)
        reload = true;
      if (definition.definitionId != updatedWorkflow.definitionId)
        reload = true;
      if (definition.version != updatedWorkflow.version)
        reload = true;
      if (definition.isPublished != updatedWorkflow.isPublished)
        reload = true;
      if (definition.isLatest != updatedWorkflow.isLatest)
        reload = true;
      if (reload) {
        await this.workflowDefinitionEditorElement.updateWorkflowDefinition(updatedWorkflow);
        await this.workflowDefinitionEditorElement.loadWorkflowVersions();
      }
      return definition;
    };
    this.updateCompositeActivityReferences = async (definition) => {
      await this.api.updateWorkflowReferences({ definitionId: definition.definitionId })
        .then(async (response) => {
        var message = 'The following consuming workflows have been successfully updated:\n\n' + response.affectedWorkflows.join('\n');
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
    this.api = Container.get(WorkflowDefinitionsApi);
    this.activityDescriptorManager = Container.get(ActivityDescriptorManager);
    this.workflowDefinitionManager = Container.get(WorkflowDefinitionManager);
    this.workflowDefinitionEditorService = Container.get(WorkflowDefinitionEditorService);
    toolbarComponentStore.components = [() => h("elsa-workflow-publish-button", { onPublishClicked: this.onPublishClicked, onUnPublishClicked: this.onUnPublishClicked, onExportClicked: this.onExportClicked, onImportClicked: this.onImportClicked, disabled: workflowDefinition.isReadonly })];
    studioComponentStore.activeComponentFactory = () => h("elsa-workflow-definition-editor", { workflowDefinition: workflowDefinition, onWorkflowUpdated: this.onWorkflowUpdated, ref: el => this.workflowDefinitionEditorElement = el });
  }
}
//# sourceMappingURL=editor-instance.js.map
