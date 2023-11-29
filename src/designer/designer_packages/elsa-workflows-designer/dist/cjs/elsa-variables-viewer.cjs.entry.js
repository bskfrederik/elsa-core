'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2c400919.js');
const descriptorsStore = require('./descriptors-store-815ac006.js');
const locale = require('./locale-4dbc7596.js');
require('./index-d016c735.js');

const VariablesViewer = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.variables = undefined;
    this.workflowDefinition = undefined;
    this.workflowInstance = undefined;
  }
  async componentWillLoad() {
    this.strings = await locale.getLocaleComponentStrings(this.element);
  }
  render() {
    const variables = this.variables;
    const storageDrivers = descriptorsStore.state.storageDrivers;
    return (index.h("div", null, index.h("div", { class: "tw-align-middle tw-inline-block tw-min-w-full tw-border-b tw-border-gray-200" }, index.h("table", { class: "default-table" }, index.h("thead", null, index.h("tr", null, index.h("th", { scope: "col" }, this.strings.variablesTabName), index.h("th", { scope: "col" }, this.strings.variablesTabValue), index.h("th", { scope: "col" }, this.strings.variablesTabType), index.h("th", { scope: "col" }, this.strings.variablesTabStorage))), index.h("tbody", null, variables.map(variable => {
      var _a, _b;
      const storage = storageDrivers.find(x => x.typeName == variable.storageDriverTypeName);
      const storageName = (_a = storage === null || storage === void 0 ? void 0 : storage.displayName) !== null && _a !== void 0 ? _a : '-';
      const descriptor = descriptorsStore.state.variableDescriptors.find(x => x.typeName == variable.typeName);
      const typeDisplayName = (_b = descriptor === null || descriptor === void 0 ? void 0 : descriptor.displayName) !== null && _b !== void 0 ? _b : variable.typeName;
      const variableValue = this.getVariableValue(variable, storage);
      return (index.h("tr", null, index.h("td", { class: "tw-whitespace-nowrap" }, variable.name), index.h("td", { class: "tw-whitespace-nowrap" }, typeDisplayName), index.h("td", null, storageName), index.h("td", { class: "tw-pr-6" }, variableValue)));
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
  get element() { return index.getElement(this); }
};

exports.elsa_variables_viewer = VariablesViewer;

//# sourceMappingURL=elsa-variables-viewer.cjs.entry.js.map