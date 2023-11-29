import { h, } from "@stencil/core";
import descriptorsStore from "../../../../data/descriptors-store";
import { getLocaleComponentStrings } from "../../../../utils/locale";
export class VariablesViewer {
  constructor() {
    this.variables = undefined;
    this.workflowDefinition = undefined;
    this.workflowInstance = undefined;
  }
  async componentWillLoad() {
    this.strings = await getLocaleComponentStrings(this.element);
  }
  render() {
    const variables = this.variables;
    const storageDrivers = descriptorsStore.storageDrivers;
    return (h("div", null, h("div", { class: "tw-align-middle tw-inline-block tw-min-w-full tw-border-b tw-border-gray-200" }, h("table", { class: "default-table" }, h("thead", null, h("tr", null, h("th", { scope: "col" }, this.strings.variablesTabName), h("th", { scope: "col" }, this.strings.variablesTabValue), h("th", { scope: "col" }, this.strings.variablesTabType), h("th", { scope: "col" }, this.strings.variablesTabStorage))), h("tbody", null, variables.map(variable => {
      var _a, _b;
      const storage = storageDrivers.find(x => x.typeName == variable.storageDriverTypeName);
      const storageName = (_a = storage === null || storage === void 0 ? void 0 : storage.displayName) !== null && _a !== void 0 ? _a : '-';
      const descriptor = descriptorsStore.variableDescriptors.find(x => x.typeName == variable.typeName);
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
  static get is() { return "elsa-variables-viewer"; }
  static get properties() {
    return {
      "variables": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Array<Variable>",
          "resolved": "Variable[]",
          "references": {
            "Array": {
              "location": "global"
            },
            "Variable": {
              "location": "import",
              "path": "../../../../models"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "workflowDefinition": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "WorkflowDefinition",
          "resolved": "WorkflowDefinition",
          "references": {
            "WorkflowDefinition": {
              "location": "import",
              "path": "../../models/entities"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "workflowInstance": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "WorkflowInstance",
          "resolved": "WorkflowInstance",
          "references": {
            "WorkflowInstance": {
              "location": "import",
              "path": "../../../../models"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      }
    };
  }
  static get elementRef() { return "element"; }
}
//# sourceMappingURL=variables-viewer.js.map
