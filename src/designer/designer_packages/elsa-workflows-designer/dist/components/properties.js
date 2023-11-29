import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { aS as WorkflowPropertiesEditorEventTypes, C as Container, B as EventBus, Y as WorkflowDefinitionsApi, o as isNullOrWhitespace } from './utils.js';
import './toolbar-component-store.js';
import { s as state } from './descriptors-store.js';
import { F as FormEntry, C as CheckboxFormEntry } from './form-entry.js';
import { I as InfoList } from './info-list.js';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$b } from './activity-input-editor-dialog-content.js';
import { d as defineCustomElement$a } from './activity-output-editor-dialog-content.js';
import { d as defineCustomElement$9 } from './context-menu.js';
import { d as defineCustomElement$8 } from './copy-button.js';
import { d as defineCustomElement$7 } from './form-panel.js';
import { d as defineCustomElement$6 } from './input-tags.js';
import { d as defineCustomElement$5 } from './variable-editor-dialog-content.js';
import { d as defineCustomElement$4 } from './variables-editor.js';
import { d as defineCustomElement$3 } from './widgets.js';
import { d as defineCustomElement$2 } from './input-output-settings.js';
import { d as defineCustomElement$1 } from './version-history.js';

var WorkflowPropertiesEditorTabs;
(function (WorkflowPropertiesEditorTabs) {
  WorkflowPropertiesEditorTabs["Properties"] = "properties";
  WorkflowPropertiesEditorTabs["Variables"] = "variables";
  WorkflowPropertiesEditorTabs["Settings"] = "settings";
  WorkflowPropertiesEditorTabs["InputOutput"] = "input-output";
  WorkflowPropertiesEditorTabs["VersionHistory"] = "versionHistory";
})(WorkflowPropertiesEditorTabs || (WorkflowPropertiesEditorTabs = {}));

const WorkflowDefinitionPropertiesEditor = /*@__PURE__*/ proxyCustomElement(class WorkflowDefinitionPropertiesEditor extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
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
              return h(FormEntry, { label: this.strings.propertiesWorkflowName, fieldId: "workflowName", hint: this.strings.propertiesWorkflowNameHint }, h("input", { type: "text", name: "workflowName", id: "workflowName", value: workflow.name, onChange: e => this.onPropertyEditorChanged(wf => wf.name = e.target.value) }));
            },
            order: 0
          }, {
            name: 'workflowDescription',
            content: () => {
              const workflow = this.workflowDefinition;
              return h(FormEntry, { label: this.strings.propertiesWorkflowDescription, fieldId: "workflowDescription", hint: this.strings.propertiesWorkflowDescriptionHint }, h("textarea", { name: "workflowDescription", id: "workflowDescription", value: workflow.description, rows: 6, onChange: e => this.onPropertyEditorChanged(wf => wf.description = e.target.value) }));
            },
            order: 5
          }, {
            name: 'workflowInfo',
            content: () => {
              const workflow = this.workflowDefinition;
              const workflowDetails = {
                [this.strings.propertiesDefitionId]: isNullOrWhitespace(workflow.definitionId) ? this.strings.propertiesNew : workflow.definitionId,
                [this.strings.propertiesVersionId]: isNullOrWhitespace(workflow.id) ? this.strings.propertiesNew : workflow.id,
                [this.strings.propertiesVersion]: workflow.version.toString(),
                [this.strings.propertiesStatus]: workflow.isPublished ? this.strings.propertiesPublished : this.strings.propertiesDraft,
                [this.strings.propertiesReadOnly]: workflow.isReadonly ? this.strings.propertiesYes : this.strings.propertiesNo
              };
              return h(InfoList, { title: "Information", dictionary: workflowDetails });
            },
            order: 10
          }]
      };
      propertiesTabModel.tab = {
        displayText: this.strings.propertiesTab,
        order: 0,
        content: () => this.renderPropertiesTab(propertiesTabModel)
      };
      const variablesTabModel = {
        name: 'variables',
        tab: {
          displayText: this.strings.variablesTab,
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
          content: () => h(FormEntry, { label: this.strings.settingsActivitationStrategy, fieldId: "workflowActivationStrategyType", hint: defaultDescription }, h("select", { name: "workflowActivationStrategyType", onChange: e => this.onPropertyEditorChanged(wf => {
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
          content: () => h(CheckboxFormEntry, { label: this.strings.settingsUsableAsActivity, fieldId: "UsableAsActivity", hint: this.strings.settingsUsableAsActivityHint }, h("input", { type: "checkbox", id: "UsableAsActivity", name: "UsableAsActivity", checked: usableAsActivity, onChange: e => this.onPropertyEditorChanged(wf => {
              const inputElement = e.target;
              wf.options.usableAsActivity = inputElement.checked;
              this.createModel();
            }) }))
        },
        {
          name: 'autoUpdateConsumingWorkflows',
          order: 0,
          content: () => h(CheckboxFormEntry, { fieldId: "UpdateConsumingWorkflows", label: this.strings.settingsAutoUpdateConsumingWorkflows, hint: this.strings.settingsAutoUpdateConsumingWorkflowsHint }, h("input", { type: "checkbox", name: "UpdateConsumingWorkflows", id: "UpdateConsumingWorkflows", checked: autoUpdateConsumingWorkflows, onChange: e => this.onPropertyEditorChanged(wf => {
              const inputElement = e.target;
              options.autoUpdateConsumingWorkflows = inputElement.checked;
              wf.options = options;
            }) }))
        }
      ];
      const settingsTabModel = {
        name: 'settings',
        tab: {
          displayText: this.strings.settingsTab,
          order: 10,
          content: () => h("elsa-widgets", { widgets: settingsWidgets })
        }
      };
      const inputOutputTabModel = {
        name: 'input-output',
        tab: {
          displayText: this.strings.inputOutputTab,
          order: 15,
          content: () => this.renderInputOutputTab()
        }
      };
      const versionHistoryTabModel = {
        name: 'versionHistory',
        tab: {
          displayText: this.strings.versionHistoryTab,
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
    this.strings = await getLocaleComponentStrings(this.element);
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
  get element() { return this; }
  static get watchers() { return {
    "workflowDefinition": ["onWorkflowDefinitionChanged"],
    "workflowVersions": ["onWorkflowVersionsChanged"]
  }; }
}, [0, "elsa-workflow-definition-properties-editor", {
    "workflowDefinition": [16],
    "workflowVersions": [16],
    "readonly": [4],
    "model": [32],
    "selectedTabIndex": [32],
    "show": [64],
    "hide": [64]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-workflow-definition-properties-editor", "elsa-activity-input-editor-dialog-content", "elsa-activity-output-editor-dialog-content", "elsa-context-menu", "elsa-copy-button", "elsa-form-panel", "elsa-input-tags", "elsa-variable-editor-dialog-content", "elsa-variables-editor", "elsa-widgets", "elsa-workflow-definition-input-output-settings", "elsa-workflow-definition-version-history"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-workflow-definition-properties-editor":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WorkflowDefinitionPropertiesEditor);
      }
      break;
    case "elsa-activity-input-editor-dialog-content":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "elsa-activity-output-editor-dialog-content":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "elsa-context-menu":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "elsa-copy-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "elsa-form-panel":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "elsa-input-tags":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "elsa-variable-editor-dialog-content":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "elsa-variables-editor":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "elsa-widgets":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "elsa-workflow-definition-input-output-settings":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "elsa-workflow-definition-version-history":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { WorkflowPropertiesEditorTabs as W, WorkflowDefinitionPropertiesEditor as a, defineCustomElement as d };

//# sourceMappingURL=properties.js.map