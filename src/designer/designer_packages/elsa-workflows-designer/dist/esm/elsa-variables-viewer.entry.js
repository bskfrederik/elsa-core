import { r as registerInstance, h, a as getElement } from './index-08112852.js';
import { s as state } from './descriptors-store-6bb78eef.js';
import { g as getLocaleComponentStrings } from './locale-9771e9cf.js';
import './index-01748867.js';

const VariablesViewer = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  get element() { return getElement(this); }
};

export { VariablesViewer as elsa_variables_viewer };

//# sourceMappingURL=elsa-variables-viewer.entry.js.map