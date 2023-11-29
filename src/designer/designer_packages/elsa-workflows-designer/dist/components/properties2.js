import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { I as InfoList } from './info-list.js';
import { C as Container, B as EventBus, o as isNullOrWhitespace, f as formatTimestamp } from './utils.js';
import './toolbar-component-store.js';
import './descriptors-store.js';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$3 } from './copy-button.js';
import { d as defineCustomElement$2 } from './form-panel.js';
import { d as defineCustomElement$1 } from './variables-viewer.js';

const WorkflowInstancePropertiesEventTypes = {
  Displaying: 'workflow-instance-properties:displaying'
};

const WorkflowDefinitionPropertiesEditor = /*@__PURE__*/ proxyCustomElement(class WorkflowDefinitionPropertiesEditor extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
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
                [this.strings.propertiesTabInstanceId]: isNullOrWhitespace(workflowInstance.id) ? this.strings.propertiesNew : workflowInstance.id,
                [this.strings.propertiesTabDefinitionId]: isNullOrWhitespace(workflowDefinition.definitionId) ? this.strings.propertiesNew : workflowDefinition.definitionId,
                [this.strings.propertiesTabVersion]: workflowDefinition.version.toString(),
              };
              const statusDetails = {
                [this.strings.propertiesTabStatus]: workflowInstance.status,
                [this.strings.propertiesTabSubStatus]: workflowInstance.subStatus
              };
              const timestampDetails = {
                [this.strings.propertiesTabCreated]: formatTimestamp(workflowInstance.createdAt),
                [this.strings.propertiesTabLastExecution]: formatTimestamp(workflowInstance.updatedAt),
                [this.strings.propertiesTabFinished]: formatTimestamp(workflowInstance.finishedAt),
              };
              return h("div", null, h(InfoList, { title: this.strings.propertiesTab, dictionary: identityDetails }), h(InfoList, { title: this.strings.propertiesTabStatus, dictionary: statusDetails }), h(InfoList, { title: this.strings.propertiesTabTimeStamps, dictionary: timestampDetails, hideEmptyValues: true }));
            },
            order: 10
          }]
      };
      propertiesTabModel.tab = {
        displayText: this.strings.propertiesTab,
        content: () => this.renderPropertiesTab(propertiesTabModel)
      };
      const variablesTabModel = {
        name: 'variables',
        tab: {
          displayText: this.strings.variablesTab,
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
    this.strings = await getLocaleComponentStrings(this.element);
    await this.createModel();
  }
  render() {
    const workflowDefinition = this.workflowDefinition;
    const title = !isNullOrWhitespace(workflowDefinition === null || workflowDefinition === void 0 ? void 0 : workflowDefinition.name) ? workflowDefinition.name : '-';
    const subTitle = 'Workflow Instance';
    const tabs = this.model.tabModels.map(x => x.tab);
    return (h("elsa-form-panel", { mainTitle: title, subTitle: subTitle, tabs: tabs, selectedTabIndex: this.selectedTabIndex, onSelectedTabIndexChanged: e => this.onSelectedTabIndexChanged(e) }));
  }
  get element() { return this; }
  static get watchers() { return {
    "workflowDefinition": ["onWorkflowDefinitionChanged"],
    "workflowInstance": ["onWorkflowInstanceChanged"]
  }; }
}, [0, "elsa-workflow-instance-properties", {
    "workflowDefinition": [16],
    "workflowInstance": [16],
    "model": [32],
    "selectedTabIndex": [32],
    "changeHandle": [32],
    "show": [64],
    "hide": [64]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-workflow-instance-properties", "elsa-copy-button", "elsa-form-panel", "elsa-variables-viewer"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-workflow-instance-properties":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WorkflowDefinitionPropertiesEditor);
      }
      break;
    case "elsa-copy-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "elsa-form-panel":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "elsa-variables-viewer":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { WorkflowDefinitionPropertiesEditor as W, defineCustomElement as d };

//# sourceMappingURL=properties2.js.map