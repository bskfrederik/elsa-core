import { r as registerInstance, e as createEvent, h } from './index-dc0ae4f5.js';
import { C as Container } from './index-1637bf51.js';
import { q as isNullOrWhitespace, ai as WorkflowPropertiesEditorEventTypes, D as EventBus, a3 as WorkflowDefinitionsApi } from './index-7d63808a.js';
import { F as FormEntry, C as CheckboxFormEntry } from './form-entry-c5af3e68.js';
import { I as InfoList } from './info-list-bd19439b.js';
import { s as state } from './descriptors-store-02a4f91c.js';
import { W as WorkflowPropertiesEditorTabs } from './props-editor-tabs-2376439b.js';
import './models-09298028.js';
import './modal-type-12f51d83.js';
import './Reflect-563aa1b4.js';
import './_commonjsHelpers-a4f66ccd.js';
import './state-450cc93e.js';
import './index-4ac684d0.js';
import './lodash-cadbac1e.js';
import './notification-service-ffb5a824.js';
import './notification-store-40f3cb5a.js';
import './toolbar-component-store-1febdbe0.js';
import './hint-ef7d4b14.js';

const WorkflowDefinitionPropertiesEditor = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.workflowPropsUpdated = createEvent(this, "workflowPropsUpdated", 7);
    this.versionSelected = createEvent(this, "versionSelected", 7);
    this.deleteVersionClicked = createEvent(this, "deleteVersionClicked", 7);
    this.revertVersionClicked = createEvent(this, "revertVersionClicked", 7);
    this.createModel = async () => {
      var _a, _b, _c;
      const model = {
        tabModels: []
      };
      const workflowDefinition = this.workflowDefinition;
      const options = workflowDefinition.options || {};
      const autoUpdateConsumingWorkflows = (_a = options.autoUpdateConsumingWorkflows) !== null && _a !== void 0 ? _a : false;
      const usableAsActivity = (_b = options.usableAsActivity) !== null && _b !== void 0 ? _b : false;
      if (!workflowDefinition) {
        this.model = model;
        return;
      }
      const propertiesTabModel = {
        name: 'properties',
        tab: null,
        Widgets: [{
            name: 'workflowName',
            content: () => {
              const workflow = this.workflowDefinition;
              return h(FormEntry, { label: "Name", fieldId: "workflowName", hint: "The name of the workflow." }, h("input", { type: "text", name: "workflowName", id: "workflowName", value: workflow.name, onChange: e => this.onPropertyEditorChanged(wf => wf.name = e.target.value) }));
            },
            order: 0
          }, {
            name: 'workflowDescription',
            content: () => {
              const workflow = this.workflowDefinition;
              return h(FormEntry, { label: "Description", fieldId: "workflowDescription", hint: "A brief description about the workflow." }, h("textarea", { name: "workflowDescription", id: "workflowDescription", value: workflow.description, rows: 6, onChange: e => this.onPropertyEditorChanged(wf => wf.description = e.target.value) }));
            },
            order: 5
          }, {
            name: 'workflowInfo',
            content: () => {
              const workflow = this.workflowDefinition;
              const workflowDetails = {
                'Definition ID': isNullOrWhitespace(workflow.definitionId) ? '(new)' : workflow.definitionId,
                'Version ID': isNullOrWhitespace(workflow.id) ? '(new)' : workflow.id,
                'Version': workflow.version.toString(),
                'Status': workflow.isPublished ? 'Published' : 'Draft',
                'Readonly': workflow.isReadonly ? 'Yes' : 'No'
              };
              return h(InfoList, { title: "Information", dictionary: workflowDetails });
            },
            order: 10
          }]
      };
      propertiesTabModel.tab = {
        displayText: 'Properties',
        order: 0,
        content: () => this.renderPropertiesTab(propertiesTabModel)
      };
      const variablesTabModel = {
        name: 'variables',
        tab: {
          displayText: 'Variables',
          order: 5,
          content: () => this.renderVariablesTab()
        }
      };
      const strategies = state.workflowActivationStrategyDescriptors;
      const firstStrategy = strategies.length > 0 ? strategies[0] : null;
      const defaultDescription = (_c = firstStrategy === null || firstStrategy === void 0 ? void 0 : firstStrategy.description) !== null && _c !== void 0 ? _c : '';
      const settingsWidgets = [
        {
          name: 'workflowActivationValidator',
          order: 0,
          content: () => h(FormEntry, { label: "Activation Strategy", fieldId: "workflowActivationStrategyType", hint: defaultDescription }, h("select", { name: "workflowActivationStrategyType", onChange: e => this.onPropertyEditorChanged(wf => {
              const selectElement = e.target;
              options.activationStrategyType = selectElement.value;
              wf.options = options;
              const hintElement = selectElement.closest('.form-entry').getElementsByClassName('form-field-hint')[0];
              const strategy = strategies.find(x => x.typeName == selectElement.value);
              hintElement.innerText = strategy.description;
            }) }, strategies.map(strategy => h("option", { value: strategy.typeName, selected: strategy.typeName == options.activationStrategyType }, strategy.displayName))))
        },
        {
          name: 'usableAsActivity',
          order: 0,
          content: () => h(CheckboxFormEntry, { label: "Usable As Activity", fieldId: "UsableAsActivity", hint: "Allow this workflow to be used as an activity." }, h("input", { type: "checkbox", id: "UsableAsActivity", name: "UsableAsActivity", checked: usableAsActivity, onChange: e => this.onPropertyEditorChanged(wf => {
              const inputElement = e.target;
              wf.options.usableAsActivity = inputElement.checked;
              this.createModel();
            }) }))
        },
        {
          name: 'autoUpdateConsumingWorkflows',
          order: 0,
          content: () => h(CheckboxFormEntry, { fieldId: "UpdateConsumingWorkflows", label: "Auto-update consuming workflows", hint: "When you publish a new version, all of the consuming workflows will be updated to point to the new version of this workflow." }, h("input", { type: "checkbox", name: "UpdateConsumingWorkflows", id: "UpdateConsumingWorkflows", checked: autoUpdateConsumingWorkflows, onChange: e => this.onPropertyEditorChanged(wf => {
              const inputElement = e.target;
              options.autoUpdateConsumingWorkflows = inputElement.checked;
              wf.options = options;
            }) }))
        }
      ];
      const settingsTabModel = {
        name: 'settings',
        tab: {
          displayText: 'Settings',
          order: 10,
          content: () => h("elsa-widgets", { widgets: settingsWidgets })
        }
      };
      const inputOutputTabModel = {
        name: 'input-output',
        tab: {
          displayText: 'Input/output',
          order: 15,
          content: () => this.renderInputOutputTab()
        }
      };
      const versionHistoryTabModel = {
        name: 'versionHistory',
        tab: {
          displayText: 'Version History',
          order: 20,
          content: () => this.renderVersionHistoryTab()
        }
      };
      model.tabModels = [propertiesTabModel, variablesTabModel, settingsTabModel, versionHistoryTabModel, inputOutputTabModel];
      const args = {
        workflowDefinition,
        model,
        notifyWorkflowDefinitionChanged: () => this.onWorkflowDefinitionUpdated()
      };
      await this.eventBus.emit(WorkflowPropertiesEditorEventTypes.Displaying, this, args);
      this.model = model;
    };
    this.renderPropertiesTab = (tabModel) => h("elsa-widgets", { widgets: tabModel.Widgets });
    this.renderVariablesTab = () => {
      var _a, _b;
      const variables = (_b = (_a = this.workflowDefinition) === null || _a === void 0 ? void 0 : _a.variables) !== null && _b !== void 0 ? _b : [];
      return h("div", null, h("elsa-variables-editor", { variables: variables, onVariablesChanged: e => this.onVariablesUpdated(e) }));
    };
    this.renderInputOutputTab = () => {
      var _a, _b, _c, _d, _e, _f;
      const inputs = (_b = (_a = this.workflowDefinition) === null || _a === void 0 ? void 0 : _a.inputs) !== null && _b !== void 0 ? _b : [];
      const outputs = (_d = (_c = this.workflowDefinition) === null || _c === void 0 ? void 0 : _c.outputs) !== null && _d !== void 0 ? _d : [];
      const outcomes = (_f = (_e = this.workflowDefinition) === null || _e === void 0 ? void 0 : _e.outcomes) !== null && _f !== void 0 ? _f : [];
      return h("div", null, h("elsa-workflow-definition-input-output-settings", { inputs: inputs, outputs: outputs, outcomes: outcomes, onInputsChanged: e => this.onInputsUpdated(e), onOutputsChanged: e => this.onOutputsUpdated(e), onOutcomesChanged: e => this.onOutcomesUpdated(e) }));
    };
    this.renderVersionHistoryTab = () => {
      return h("div", null, h("elsa-workflow-definition-version-history", { selectedVersion: this.workflowDefinition, workflowVersions: this.workflowVersions }));
    };
    this.onSelectedTabIndexChanged = (e) => this.selectedTabIndex = e.detail.selectedTabIndex;
    this.onPropertyEditorChanged = (apply) => {
      const workflowDefinition = this.workflowDefinition;
      apply(workflowDefinition);
      this.workflowPropsUpdated.emit({ workflowDefinition: workflowDefinition });
    };
    this.onVariablesUpdated = async (e) => this.onPropsUpdated('variables', e.detail);
    this.onInputsUpdated = async (e) => this.onPropsUpdated('inputs', e.detail);
    this.onOutputsUpdated = async (e) => this.onPropsUpdated('outputs', e.detail);
    this.onOutcomesUpdated = async (e) => this.onPropsUpdated('outcomes', e.detail);
    this.onPropsUpdated = async (propName, propValue) => {
      const workflowDefinition = this.workflowDefinition;
      if (!workflowDefinition || !workflowDefinition.isLatest) {
        console.debug('onPropsUpdated: workflowDefinition is not latest');
        return;
      }
      workflowDefinition[propName] = propValue;
      const updatedTab = this.getPropEditorSectionByPropName(propName);
      this.workflowPropsUpdated.emit({ workflowDefinition, updatedTab });
      await this.createModel();
    };
    this.onWorkflowDefinitionUpdated = () => {
      const workflowDefinition = this.workflowDefinition;
      this.workflowPropsUpdated.emit({ workflowDefinition });
    };
    this.workflowDefinition = undefined;
    this.workflowVersions = undefined;
    this.readonly = undefined;
    this.model = undefined;
    this.selectedTabIndex = 0;
    this.eventBus = Container.get(EventBus);
    this.workflowDefinitionApi = Container.get(WorkflowDefinitionsApi);
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
  async onWorkflowVersionsChanged() {
    await this.createModel();
  }
  async componentWillLoad() {
    await this.createModel();
  }
  render() {
    var _a;
    const workflowDefinition = this.workflowDefinition;
    const title = (_a = workflowDefinition === null || workflowDefinition === void 0 ? void 0 : workflowDefinition.name) !== null && _a !== void 0 ? _a : 'Untitled';
    const subTitle = 'Workflow Definition';
    const tabs = this.model.tabModels.map(x => x.tab);
    return (h("elsa-form-panel", { isReadonly: this.readonly, mainTitle: title, subTitle: subTitle, tabs: tabs, selectedTabIndex: this.selectedTabIndex, onSelectedTabIndexChanged: e => this.onSelectedTabIndexChanged(e) }));
  }
  getPropEditorSectionByPropName(propName) {
    const enumKey = Object.keys(WorkflowPropertiesEditorTabs).find(key => WorkflowPropertiesEditorTabs[key] === propName);
    if (enumKey) {
      return WorkflowPropertiesEditorTabs[enumKey];
    }
    return null;
  }
  static get watchers() { return {
    "workflowDefinition": ["onWorkflowDefinitionChanged"],
    "workflowVersions": ["onWorkflowVersionsChanged"]
  }; }
};

export { WorkflowDefinitionPropertiesEditor as elsa_workflow_definition_properties_editor };

//# sourceMappingURL=elsa-workflow-definition-properties-editor.entry.js.map