import { r as registerInstance, h } from './index-dc0ae4f5.js';
import { I as InfoList } from './info-list-bd19439b.js';
import { q as isNullOrWhitespace, f as formatTimestamp, D as EventBus } from './index-7d63808a.js';
import { C as Container } from './index-1637bf51.js';
import './Reflect-563aa1b4.js';
import './_commonjsHelpers-a4f66ccd.js';
import './descriptors-store-02a4f91c.js';
import './index-4ac684d0.js';
import './lodash-cadbac1e.js';
import './notification-service-ffb5a824.js';
import './notification-store-40f3cb5a.js';
import './toolbar-component-store-1febdbe0.js';
import './models-09298028.js';
import './modal-type-12f51d83.js';
import './state-450cc93e.js';

const WorkflowInstanceViewerEventTypes = {
  WorkflowDefinition: {
    Imported: 'workflow-instance-viewer:workflow-instance:imported'
  },
  WorkflowInstanceViewer: {
    Ready: 'workflow-instance-viewer:ready'
  }
};
const WorkflowInstancePropertiesEventTypes = {
  Displaying: 'workflow-instance-properties:displaying'
};

const WorkflowDefinitionPropertiesEditor = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.createModel = async () => {
      const model = {
        tabModels: [],
      };
      const workflowDefinition = this.workflowDefinition;
      const workflowInstance = this.workflowInstance;
      if (!workflowDefinition || !workflowInstance) {
        this.model = model;
        return;
      }
      const propertiesTabModel = {
        name: 'properties',
        tab: null,
        Widgets: [{
            name: 'workflowInstanceInfo',
            content: () => {
              const identityDetails = {
                'Instance ID': isNullOrWhitespace(workflowInstance.id) ? '(new)' : workflowInstance.id,
                'Definition ID': isNullOrWhitespace(workflowDefinition.definitionId) ? '(new)' : workflowDefinition.definitionId,
                'Version': workflowDefinition.version.toString(),
              };
              const statusDetails = {
                'Status': workflowInstance.status,
                'Sub status': workflowInstance.subStatus
              };
              const timestampDetails = {
                'Created': formatTimestamp(workflowInstance.createdAt),
                'Last execution': formatTimestamp(workflowInstance.updatedAt),
                'Finished': formatTimestamp(workflowInstance.finishedAt),
              };
              return h("div", null, h(InfoList, { title: "Identity", dictionary: identityDetails }), h(InfoList, { title: "Status", dictionary: statusDetails }), h(InfoList, { title: "Timestamps", dictionary: timestampDetails, hideEmptyValues: true }));
            },
            order: 10
          }]
      };
      propertiesTabModel.tab = {
        displayText: 'Properties',
        content: () => this.renderPropertiesTab(propertiesTabModel)
      };
      const variablesTabModel = {
        name: 'variables',
        tab: {
          displayText: 'Variables',
          content: () => this.renderVariablesTab()
        }
      };
      model.tabModels = [propertiesTabModel, variablesTabModel];
      const args = { model };
      await this.eventBus.emit(WorkflowInstancePropertiesEventTypes.Displaying, this, args);
      this.model = model;
    };
    this.renderPropertiesTab = (tabModel) => {
      const widgets = tabModel.Widgets.sort((a, b) => a.order < b.order ? -1 : a.order > b.order ? 1 : 0);
      return h("div", null, widgets.map(widget => widget.content()));
    };
    this.renderVariablesTab = () => {
      var _a, _b;
      const variables = (_b = (_a = this.workflowDefinition) === null || _a === void 0 ? void 0 : _a.variables) !== null && _b !== void 0 ? _b : [];
      return h("div", null, h("elsa-variables-viewer", { variables: variables, workflowDefinition: this.workflowDefinition, workflowInstance: this.workflowInstance }));
    };
    this.onSelectedTabIndexChanged = (e) => this.selectedTabIndex = e.detail.selectedTabIndex;
    this.workflowDefinition = undefined;
    this.workflowInstance = undefined;
    this.model = undefined;
    this.selectedTabIndex = 0;
    this.changeHandle = {};
    this.eventBus = Container.get(EventBus);
    this.model = {
      tabModels: [],
    };
  }
  async show() {
    await this.slideOverPanel.show();
  }
  async hide() {
    await this.slideOverPanel.hide();
  }
  async onWorkflowDefinitionChanged() {
    await this.createModel();
  }
  async onWorkflowInstanceChanged() {
    await this.createModel();
  }
  async componentWillLoad() {
    await this.createModel();
  }
  render() {
    const workflowDefinition = this.workflowDefinition;
    const title = !isNullOrWhitespace(workflowDefinition === null || workflowDefinition === void 0 ? void 0 : workflowDefinition.name) ? workflowDefinition.name : '-';
    const subTitle = 'Workflow Instance';
    const tabs = this.model.tabModels.map(x => x.tab);
    return (h("elsa-form-panel", { mainTitle: title, subTitle: subTitle, tabs: tabs, selectedTabIndex: this.selectedTabIndex, onSelectedTabIndexChanged: e => this.onSelectedTabIndexChanged(e) }));
  }
  static get watchers() { return {
    "workflowDefinition": ["onWorkflowDefinitionChanged"],
    "workflowInstance": ["onWorkflowInstanceChanged"]
  }; }
};

export { WorkflowDefinitionPropertiesEditor as elsa_workflow_instance_properties };

//# sourceMappingURL=elsa-workflow-instance-properties.entry.js.map