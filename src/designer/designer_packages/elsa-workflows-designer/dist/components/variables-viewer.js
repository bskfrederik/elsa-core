import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { s as state } from './descriptors-store.js';
import { g as getLocaleComponentStrings } from './locale.js';

const VariablesViewer = /*@__PURE__*/ proxyCustomElement(class VariablesViewer extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.variables = undefined;
    this.workflowDefinition = undefined;
    this.workflowInstance = undefined;
  }
  async componentWillLoad() {
    this.strings = await getLocaleComponentStrings(this.element);
  }
  render() {
    const variables = this.variables;
    const storageDrivers = state.storageDrivers;
    return (h("div", null, h("div", { class: "tw-align-middle tw-inline-block tw-min-w-full tw-border-b tw-border-gray-200" }, h("table", { class: "default-table" }, h("thead", null, h("tr", null, h("th", { scope: "col" }, this.strings.variablesTabName), h("th", { scope: "col" }, this.strings.variablesTabValue), h("th", { scope: "col" }, this.strings.variablesTabType), h("th", { scope: "col" }, this.strings.variablesTabStorage))), h("tbody", null, variables.map(variable => {
      var _a, _b;
      const storage = storageDrivers.find(x => x.typeName == variable.storageDriverTypeName);
      const storageName = (_a = storage === null || storage === void 0 ? void 0 : storage.displayName) !== null && _a !== void 0 ? _a : '-';
      const descriptor = state.variableDescriptors.find(x => x.typeName == variable.typeName);
      const typeDisplayName = (_b = descriptor === null || descriptor === void 0 ? void 0 : descriptor.displayName) !== null && _b !== void 0 ? _b : variable.typeName;
      const variableValue = this.getVariableValue(variable, storage);
      return (h("tr", null, h("td", { class: "tw-whitespace-nowrap" }, variable.name), h("td", { class: "tw-whitespace-nowrap" }, typeDisplayName), h("td", null, storageName), h("td", { class: "tw-pr-6" }, variableValue)));
    }))))));
  }
  getVariableValue(variable, storage) {
    if ((storage === null || storage === void 0 ? void 0 : storage.typeName) !== 'Elsa.Workflows.Core.Implementations.WorkflowStorageDriver, Elsa.Workflows.Core')
      return null;
    const workflowInstance = this.workflowInstance;
    const persistentVariables = workflowInstance.properties.PersistentVariablesDictionary;
    const key = `${workflowInstance.id}:Workflow1:${variable.name}`;
    return persistentVariables[key];
  }
  get element() { return this; }
}, [0, "elsa-variables-viewer", {
    "variables": [16],
    "workflowDefinition": [16],
    "workflowInstance": [16]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-variables-viewer"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-variables-viewer":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, VariablesViewer);
      }
      break;
  } });
}

export { VariablesViewer as V, defineCustomElement as d };

//# sourceMappingURL=variables-viewer.js.map